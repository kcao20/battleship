from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

DB_FILE = "database.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False)
cur = db.cursor()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/leaderboard")
def leaderboard():
    cur.execute("SELECT username, gamesPlayed, gamesWon, gamesLost, shotsMissed, shotsLanded FROM usersClassic")
    classicTable = cur.fetchall()
    cur.execute("SELECT username, gamesPlayed, gamesWon, gamesLost, shotsMissed, shotsLanded, powersUsed FROM usersModern")
    modernTable = cur.fetchall()
    return render_template("leaderboard.html", classic=classicTable, modern=modernTable)


if __name__ == "__main__":
    app.debug = True
    app.run()
