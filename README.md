# battleship by bilgewater brigadiers
by Kevin Cao, Andy Lin, Austin Ngan, Shadman Rakib

### Making a game akin to Hasbro’s BATTLESHIP, a game that uses the classic rules for Battleship and adds some twists to the game, using differently shaped ships, maps and abilities.
___
### Roles:
Kevin: Project Manager & VM(Digital Ocean Droplet) & Frontend (registering clicks/UI)

Andy: Frontend (board management)/ digital ocean debugger

Austin: Backend (Leaderboard DB, connection between frontend and backend)

Shadman: Frontend (registering hits, changing maps, abilities)
___
## Instructions to set up on local machine
### 1. Clone the repository in terminal:
```
git clone https://github.com/kcao20/battleship.git
```

### 2. Create and activate a virtual enviroment:
```
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies:
```
cd battleship
pip3 install -r requirements.txt  
```

### 4. Navigate to the directory and run:
```
cd app
python3 __init__.py
```

### 5. Open up the url given by the terminal: [http://127.0.0.1:5000/]
___
## Instructions to set up on Digital Ocean
### This guide assumes you have a working vm and apache set up. https://github.com/kcao20/workshop/blob/main/24_LAMP/README.md
### 1. Install WSGI and enable it
```
sudo apt-get install libapache2-mod-wsgi-py3
sudo a2enmod wsgi
```
### 2. Create directories
```
cd /var/www
sudo mkdir FlaskApp
sudo chown <username> FlaskApp
sudo chgrp -R www-data FlaskApp
sudo chmod g+s FlaskApp
cd FlaskApp
```
### 3. Clone the repository
```
git clone https://github.com/kcao20/battleship.git
mkdir FlaskApp && cp -r battleship/app/* battleship/requirements.txt FlaskApp
```

### 4. Create and activate a virtual enviroment:
```
sudo apt install python3.8-venv
python3 -m venv venv
source venv/bin/activate
```

### 5. Install dependencies:
```
cd FlaskApp
pip3 install -r requirements.txt
```

### 6. Setup WSGI
```
sudo nano /etc/apache2/sites-available/FlaskApp.conf
```
Add:
```
<VirtualHost *:80>
  ServerName yourdomain.com
  ServerAdmin youemail@email.com
  WSGIScriptAlias / /var/www/FlaskApp/flaskapp.wsgi
  <Directory /var/www/FlaskApp/FlaskApp/>
    Order allow,deny
    Allow from all
  </Directory>
  Alias /static /var/www/FlaskApp/FlaskApp/static
   <Directory /var/www/FlaskApp/FlaskApp/static/>
    Order allow,deny
    Allow from all
  </Directory>
  ErrorLog ${APACHE_LOG_DIR}/error.log
  LogLevel warn
  CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```
```
cd /var/www/FlaskApp
nano flaskapp.wsgi
```
Add:
```
#!/usr/bin/python
python_home = '/var/www/FlaskApp/venv'

import sys
import site

# Calculate path to site-packages directory.

python_version = '.'.join(map(str, sys.version_info[:2]))
site_packages = python_home + '/lib/python%s/site-packages' % python_version

# Add the site-packages directory.

site.addsitedir(site_packages)

import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/FlaskApp/")
sys.path.insert(0,"/var/www/FlaskApp/FlaskApp/")

from FlaskApp import app as application
application.secret_key = 'something super SUPER secret'
```

### 8. Enable the site and reload apache
```
sudo a2ensite FlaskApp.conf
systemctl reload apache2
```

### 9. Enter the domain or ip of your website in the search bar to see the website.

### Common Issues
When apache2 tries opening/writing to the database, it often fails.

To fix, use the absolute path for the database and any other files you try to open that are not static.
