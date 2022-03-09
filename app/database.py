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

def add_userC(username):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	c.execute(SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
	check = c.fetchone()
	
	if row is not None:
		return False
		
	c.execute("""INSERT INTO usersClassic(username) VALUES(?)""", (username))
	db.commit()
	db.close()
	return True

def add_userM(username):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	c.execute("SELECT * FROM users WHERE LOWER(username) = LOWER(?)", (username,))
	check = c.fetchone()
	
	if row is not None:
		return False
		
	c.execute("""INSERT INTO usersModern(username) VALUES(?)""", (username))
	db.commit()
	db.close()
	return True
	
	
def add_statsC(username,win,shotsHit,shotsMissed):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	c.execute("SELECT * FROM usersC WHERE id = ?", (username,))
	
	
	db.close()


def add_statsM(username,win,shotsHit,shotsMissed,powersUsed):


