#Team Name: Bildgewater Brigadiers
#SoftDev
#P02 - battleship!
#2022-03-08

from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def job_decider_web():
    return "Hello there"
    # return render_template("tablified.html", job = jobs, percentage = percentages, count = len(jobs), result = makeChoice())
    
if __name__ == "__main__":  
    app.debug = True       
    app.run()