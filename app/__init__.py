from flask import Flask, render_template, request, jsonify
import sqlite3
import os
import database

app = Flask(__name__)

DB_FILE = os.path.join(os.path.dirname(__file__), "database.db")
db = sqlite3.connect(DB_FILE, check_same_thread=False)
cur = db.cursor()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/leaderboard")
def leaderboard():
    cur.execute(
        "SELECT username, gamesPlayed, gamesWon, gamesLost, shotsMissed, shotsLanded FROM usersClassic"
    )
    classicTable = cur.fetchall()
    cur.execute(
        "SELECT username, gamesPlayed, gamesWon, gamesLost, shotsMissed, shotsLanded, powersUsed FROM usersModern"
    )
    modernTable = cur.fetchall()
    return render_template("leaderboard.html", classic=classicTable, modern=modernTable)


@app.route("/play")
def playground():
    return render_template("playground.html")


@app.route('/getdata', methods=['GET', 'POST'])
def getdata():

    # POST request
    if request.method == 'POST':
        print('Incoming..')
        a = request.get_json()
        print(a)
        return 'OK', 200

    # GET request
    else:
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers


if __name__ == "__main__":
    app.debug = True
    app.run()
