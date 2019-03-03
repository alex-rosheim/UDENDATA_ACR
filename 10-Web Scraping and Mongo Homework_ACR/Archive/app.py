from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import mars_scrape

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_info"
mongo = PyMongo(app)


@app.route("/")
def homepage():
    result = mongo.db.mars_collection.find_one()
    return render_template("index.html", result = result)


@app.route("/scrape")
def scrape():
    pass
    # that function returns a dicitionary
    result = mars_scrape.scrape_master()
    mongo.db.mars_collection.update({}, result, upsert=True)
    return redirect("/", 302)



if __name__ == '__main__':
    app.run(debug=True, port=5544)
