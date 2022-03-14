import sqlite3

DB_FILE = "database.db"
db = sqlite3.connect(DB_FILE)
cur = db.cursor()

cur.execute("""
	CREATE TABLE IF NOT EXISTS usersClassic(
		username TEXT,
		gamesPlayed INTEGER,
		gamesWon INTEGER,
		gamesLost INTEGER,
		shotsMissed INTEGER,
		shotsLanded INTEGER
		)""")
	
cur.execute("""
	CREATE TABLE IF NOT EXISTS leaderboardClassic(
		username TEXT,
		winRatio REAL,
		hitRatio REAL,
		gamesPlayed INTEGER,
		gamesWon INTEGER)""")

cur.execute("""
	CREATE TABLE IF NOT EXISTS usersModern(
		username TEXT,
		gamesPlayed INTEGER,
		gamesWon INTEGER,
		gamesLost INTEGER,
		shotsMissed INTEGER,
		shotsLanded INTEGER,
		powersUsed INTEGER
		)""")
	
cur.execute("""
	CREATE TABLE IF NOT EXISTS leaderboardModern(
		username TEXT,
		winRatio REAL,
		hitRatio REAL,
		powersUsed INTEGER,
		gamesPlayed INTEGER,
		gamesWon INTEGER)""")

db.commit()
db.close()

def add_userC(username):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	c.execute("""INSERT INTO usersClassic(username,gamesplayed,gameswon,gameslost,shotsmissed,shotslanded) VALUES(?, ?, ?, ?, ?, ?)""", (username,0,0,0,0,0))
	db.commit()
	db.close()
	return True

def add_userM(username):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	c.execute("SELECT * FROM usersModern WHERE LOWER(username) = LOWER(?)", (username,))
	check = c.fetchone()
	
	if check is not None:
		return False
		
	c.execute("""INSERT INTO usersModern(username,gamesplayed,gameswon,gameslost,shotsmissed,shotslanded,powersused) VALUES(?,?,?,?,?,?,?)""", (username,0,0,0,0,0,0))
	db.commit()
	db.close()
	return True
	
#win is a boolean, shotsHit/shotsMissed are integers	
def add_statsC(username,win,shotsHit,shotsMissed):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	if win:
	
		c.execute("""
					UPDATE usersClassic
						SET gamesPlayed = gamesPlayed + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersClassic
						SET gameswon = gameswon + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersClassic
						SET shotslanded = shotslanded + ?
					WHERE username = ?""", (shotsHit,username))
		c.execute("""
					UPDATE usersClassic
						SET shotsMissed = shotsMissed + ?
					WHERE username = ?""", (shotsMissed,username))
	else:
		c.execute("""
					UPDATE usersClassic
						SET gamesPlayed = gamesPlayed + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersClassic
						SET gamesLost = gamesLost + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersClassic
						SET shotslanded = shotslanded + ?
					WHERE username = ?""", (shotsHit,username))
		c.execute("""
					UPDATE usersClassic
						SET shotsMissed = shotsMissed + ?
					WHERE username = ?""", (shotsMissed,username))
	db.commit()
	db.close()
	return True

def add_statsC(username,win,shotsHit,shotsMissed,powersUsed):
	db = sqlite3.connect(DB_FILE)
	c = db.cursor()
	
	if win:
	
		c.execute("""
					UPDATE usersModern
						SET gamesPlayed = gamesPlayed + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersModern
						SET gameswon = gameswon + 1
					WHERE username = ?""", (username,))
		c.execute("""
					UPDATE usersModern
						SET shotslanded = shotslanded + ?
					WHERE username = ?""", (shotsHit,username))
		c.execute("""
					UPDATE usersModern
						SET shotsMissed = shotsMissed + ?
					WHERE username = ?""", (shotsMissed,username))
	else:
		c.execute("""
					UPDATE usersClassic
						SET gamesPlayed = gamesPlayed + 1
						SET gamesLost = gamesLost + 1
						SET shotsLanded = shotsLanded + ?
						SET shotsMissed = shotsMissed + ? 
					WHERE username = ?""", (shotsHit, shotsMissed, username,))
	db.commit()
	db.close()
	return True

#add_userM("test")
#add_userC("test")
#add_statsC("test",True,3,7)
