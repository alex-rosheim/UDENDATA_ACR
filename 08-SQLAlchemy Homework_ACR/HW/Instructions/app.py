# 1. import Flask
from flask import Flask, jsonify
# %matplotlib inline
# from matplotlib import style
# style.use('fivethirtyeight')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

def get_session_and_tables():
    engine = create_engine("sqlite:///Resources/hawaii.sqlite")
    # reflect an existing database into a new model
    Base = automap_base()
    # reflect the tables
    Base.prepare(engine, reflect=True)
    # Save references to each table
    Measurement = Base.classes.measurement
    Station = Base.classes.station
    # Create our session (link) from Python to the DB
    session = Session(engine)
    return (session, Measurement, Station)

# 2. Create an app, being sure to pass __name__
app = Flask(__name__)

#GLOBAL LEVEL
# precip_dict = []
# tobs_dict = []
# for row in session.query(Measurement).\
#     filter(Measurement.date > '2016-08-23'):
#     precip_dict.append({row.date : row.prcp})
#     tobs_dict.append({row.date : row.tobs})

# station_dict = []
# for row in session.query(Station):
#     station_dict.append({row.name : row.station})


# 3. Define what to do when a user hits the index route
@app.route("/")
def home():
    print("Server received request for 'Home' page...")
    return """
        <html>
            <body>
            <h1>Available Routes:</h1>
            <br/>
            <a href="http://localhost:5000/precipitation">Precipitation</a>
            <br/>
            <a href="http://localhost:5000/stations">stations</a>
            <br/>
            <a href="http://localhost:5000/tobs">temperature observations</a>
            <br/>
            <a href="http://localhost:5000/start_date">start_date</a>
            <br/>
            <a href="http://localhost:5000/start_date/end_date">start_date/end_date</a>
            <br/>
            </body>
        </html>
    """

# 4. Define what to do when a user hits the /about route
@app.route("/precipitation")
def precipitation():
    print("Server received request for 'Precipitation' page...")
    session, Measurement, Station = get_session_and_tables()
    precip_dict = []
    for row in session.query(Measurement).\
        filter(Measurement.date > '2016-08-23'):
        precip_dict.append({row.date : row.prcp})
    return jsonify(precip_dict)


@app.route("/stations")
def stations():
    print("Server received request for 'stations' page...")
    session, Measurement, Station = get_session_and_tables()
    station_dict = []
    for row in session.query(Station):
        station_dict.append({row.name : row.station})
    return jsonify(station_dict)


@app.route("/tobs")
def tobs():
    print("Server received request for 'tobs' page...")
    session, Measurement, Station = get_session_and_tables()
    tobs_dict = []
    for row in session.query(Measurement).\
        filter(Measurement.date > '2016-08-23'):
        tobs_dict.append({row.date : row.tobs})
    return jsonify(tobs_dict)

@app.route("/<start_date>") #example date of 2016-08-23 WORKED!
def start(start_date):
    print("Server received request for 'start' page...")
    session, Measurement, Station = get_session_and_tables()
    start = []
    start_session = session.query(func.min(Measurement.tobs),\
    func.avg(Measurement.tobs),\
    func.max(Measurement.tobs)).\
    filter(Measurement.date >= start_date).all()

    for x in start_session:
        tmin = start_session[0][0]
        tavg = start_session[0][1]
        tmax = start_session[0][2]
        start.append({
        'HOW TO USE' : "Please call URL in YYYY-MM-DD Format!",
        'tmin' : tmin,
        'tavg' : tavg,
        'tmax' : tmax })
    return jsonify(start)

@app.route("/<start_date>/<end_date>") #WORKED! http://localhost:5000/2014-08-27/2015-08-27
def start_end(start_date, end_date):
    print("Server received request for 'start_end' page...")
    session, Measurement, Station = get_session_and_tables()
    start_end = []
    start_end_session = session.query(func.min(Measurement.tobs),\
    func.avg(Measurement.tobs),\
    func.max(Measurement.tobs)).\
    filter(Measurement.date >= start_date).\
    filter(Measurement.date <= end_date).all()

    for x in start_end_session:
        tmin = start_end_session[0][0]
        tavg = start_end_session[0][1]
        tmax = start_end_session[0][2]
        start_end.append({
        'HOW TO USE' : "Please call URL in YYYY-MM-DD/YYYY-MM-DD Format!",
        'tmin' : tmin,
        'tavg' : tavg,
        'tmax' : tmax })
    return jsonify(start_end)


if __name__ == "__main__":
    app.run(debug=True)
