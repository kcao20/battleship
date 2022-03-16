from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

@app.route("/play")
def playground():
    return render_template("playground.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
