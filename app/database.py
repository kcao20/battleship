import sqlite3

DB_FILE = "database.db"
db = sqlite3.connect(DB_FILE)
cur = db.cursor()

cur.execute("""
	CREATE TABLE IF NOT EXISTS usersClassic(
		username TEXT
		gamesPlayed INTEGER
		gamesWon INTEGER
		gamesLost INTEGER
		shotsMissed INTEGER
		shotsLanded INTEGER
		)""")
	
cur.execute("""
	CREATE TABLE IF NOT EXISTS leaderboardClassic(
		username TEXT
		winRatio REAL
		hitRatio REAL
		gamesPlayed INTEGER
		gamesWon INTEGER)""")

cur.execute("""
	CREATE TABLE IF NOT EXISTS usersModern(
		username TEXT
		gamesPlayed INTEGER
		gamesWon INTEGER
		gamesLost INTEGER
		shotsMissed INTEGER
		shotsLanded INTEGER
		powersUsed INTEGER
		)""")
	
cur.execute("""
	CREATE TABLE IF NOT EXISTS leaderboardModern(
		username TEXT
		winRatio REAL
		hitRatio REAL
		powersUsed INTEGER
		gamesPlayed INTEGER
		gamesWon INTEGER)""")

db.commit()
db.close()
