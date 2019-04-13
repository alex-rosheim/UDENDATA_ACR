import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
disk_engine = create_engine('sqlite:///db/nba_stats.sqlite')


@app.route("/")
def index():


    return render_template("index.html")

# render_template("index.html", table = table)

@app.route("/metadata/date")
def sample_metadata_1():
    """Return the MetaData for a given sample."""
    
    df = pd.read_sql_query(f'SELECT DISTINCT(GAME_DATE) FROM nba',disk_engine)
    date_dict = df.to_dict()
    print(sample_metadata_1)
    return jsonify(date_dict)


@app.route("/metadata/<date_data>")
def sample_metadata(date_data):
    """Return the MetaData for a given sample."""
    
    df = pd.read_sql_query(f'SELECT GAME_DATE, TEAM_NAME, MATCHUP,\
    PLAYER_NAME, PLAYER_POSITION,NBA_FANTASY_PTS, FG3M, AST, BLK, FGM, FTM, REB, STL, TOV FROM nba WHERE GAME_DATE = "{date_data}"', disk_engine)
    column_order = ['GAME_DATE', 'TEAM_NAME', 'MATCHUP','PLAYER_NAME', 'PLAYER_POSITION','NBA_FANTASY_PTS', 'FG3M', 'AST', 'BLK', 'FGM', 'FTM', 'REB', 'STL', 'TOV']


    d = df.to_dict('records')

    container = []
    for x in d:
        resorted = sorted(x.items(), key=lambda i:column_order.index(i[0]))
        container.append(resorted)


    print(sample_metadata)
    return jsonify(container)


@app.route("/metadata/all_data")
def all_metadata():
    """Return the MetaData for a given sample."""
    
    df = pd.read_sql_query(f'SELECT * FROM nba',disk_engine)
    data = df.to_dict('records')
    print(sample_metadata)
    return jsonify(data)


if __name__ == "__main__":
    app.run()