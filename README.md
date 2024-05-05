<div style="text-align: center;">
    <img src="https://www.effseit.fr/public/img/medium/logoepfpng_642580bd3298c0.78845696.png" alt="EPF Logo" width="200">
</div>

# EPFBook - Your Own Social Network

EPFBook is a web-based social networking platform created as a project for the MDE Web Programming course with Node.js, Express and MongoDB.

## Table of contents

* [Installation](#installation)
	* [Pre-requisites](#pre-requisites)
	* [Setup](#setup)
* [Usage](#usage)
	* [Development mode](#development-mode)
	* [Production mode](#production-mode)
	* [Deploy EPFBOOK on a server](#deploy-epfbook-on-a-server)
* [Features](#features)
	* [API](#api)
	* [Website](#website)
	* [Other features](#other-features)
* [Rick and Morty API Example](#rick-and-morty-api-example)
	* [Documentation Reference](#documentation-reference)
	* [The request](#the-request)
	* [The result](#the-result)


## Installation

### Pre-requisites
Before you begin, ensure you have met the following requirements:
- [Git](https://git-scm.com/downloads) (v2.34.1 or higher)
- [Nvm](https://github.com/nvm-sh/nvm) (v0.39.7 or higher)
- [Docker](https://www.docker.com/products/docker-desktop/) (v25.0.3 or higher)

### Setup
To install EPFBook, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:EPF-MDE/MMMDE4IN19-24-EPFBOOK-burdinat-theo.git
   ```
   or
   ```bash
   git clone https://github.com/EPF-MDE/MMMDE4IN19-24-EPFBOOK-burdinat-theo.git
   ```

2. Navigate to the project directory:
   ```bash
   cd MMMDE4IN19-24-EPFBOOK-burdinat-theo
	```

3. Install node (v21.6.2):
   ```bash
   nvm install
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

EPFBook is now ready to run

## Usage

### Development mode
To run EPFBook in development mode (Nodemon), follow these steps:

1. Create or start the MongoDB server:
   ```bash
   npm run docker_create #If it has never been created before
   ```
   ```bash
   npm run docker_start #If you just want to start the server
   ```

2. Run the application:
   ```bash
   npm run dev
   ```

3. Open a web browser and navigate to http://localhost:3000 to access the application.

4. Access to the app with admin IDs:

	**Username:** admin

	**Password:** admin

5. To exit MongoDB server:
   ```bash
   npm run docker_stop
   ```

The server will restart automatically on code update. You can stop the server using Ctrl+C.

### Production mode
To run EPFBook in production mode (PM2), follow these steps:

1. Dowload PM2 (only the first time):
   ```bash
   npm i --save --global pm2
   ```

2. Create or start the MongoDB server:
   ```bash
   npm run docker_create #If it has never been created before
   ```
   ```bash
   npm run docker_start #If you just want to start the server
   ```

3. Run the application:
   ```bash
   npm run pm2_start
   ```

4. Open a web browser and navigate to http://localhost:3000 to access the application.

5. Access to the app with admin IDs:

	**Username:** admin

	**Password:** admin

6. You can stop the app using:
	```bash
	npm run pm2_stop
	```

7. To exit MongoDB server:
   ```bash
   npm run docker_stop
   ```

The server will restart automatically in case of unexpected crash.

### Deploy EPFBOOK on a server

First 1 to 3 are to do only the first time.

1. Install NGINX - it will permits to set up a reverse proxy:
   ```bash
   sudo apt-get install nginx
   ```

2. Update NGINX configuration to redirect HTTP requests on port 80 to port 3000:
	```bash
	sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backupsudo 
	nano /etc/nginx/sites-available/default
	```
	Content to update:
	```
	server {
		listen 80; 
		server_name p3000; 
		location / { 
			proxy_pass http://0.0.0.0:3000; 
			include /etc/nginx/proxy_params; 
		}
	}
	```

3. Restart NGINX:
	```bash
	sudo systemctl restart nginx
	```

4. Then you can run the app following [dev](#development-mode) or [prod](#production-mode) modes, and connect you to the app using the IP address of your server.

## Features

### API

#### GET requests
...

#### POST requests
...

#### PUT requests
...

### Website

#### Home page
...

#### From CSV database
...

#### From MongoDB database
...

#### Data visualization page
...

#### Student details / Update students' data
...

#### Handle the scenario where the id parameter does not match any student in the details view
...

### Other features

#### ESLint
...

#### Responsive
...

#### Basic Authentification
...

## Rick and Morty API Example

This example demonstrates how to perform a basic API GET request to retrieve information about a specific character from the Rick and Morty API. We'll find out details about the character with ID 5.

### Documentation Reference

The detailed **documentation** of Rick and Morty API is available [here](https://rickandmortyapi.com/documentation#character).

### The request

To fetch details about the character with **ID 5**, we need to execute a **GET request** to the following URL:
   ```
   GET https://rickandmortyapi.com/api/character/5
   ```
I recommend you use [**Insomnia**](https://insomnia.rest/) to easily make your **API requests**.

### The result

We found that the character with ID 5 is **Jerry Smith** !
   ```json
   {
	"id": 5,
	"name": "Jerry Smith",
	"status": "Alive",
	"species": "Human",
	"type": "",
	"gender": "Male",
	"origin": {
		"name": "Earth (Replacement Dimension)",
		"url": "https://rickandmortyapi.com/api/location/20"
	},
	"location": {
		"name": "Earth (Replacement Dimension)",
		"url": "https://rickandmortyapi.com/api/location/20"
	},
	"image": "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
	"episode": [
		"https://rickandmortyapi.com/api/episode/6",
		"https://rickandmortyapi.com/api/episode/7",
		"https://rickandmortyapi.com/api/episode/8",
		"https://rickandmortyapi.com/api/episode/9",
		"https://rickandmortyapi.com/api/episode/10",
		"https://rickandmortyapi.com/api/episode/11",
		"https://rickandmortyapi.com/api/episode/12",
		"https://rickandmortyapi.com/api/episode/13",
		"https://rickandmortyapi.com/api/episode/14",
		"https://rickandmortyapi.com/api/episode/15",
		"https://rickandmortyapi.com/api/episode/16",
		"https://rickandmortyapi.com/api/episode/18",
		"https://rickandmortyapi.com/api/episode/19",
		"https://rickandmortyapi.com/api/episode/20",
		"https://rickandmortyapi.com/api/episode/21",
		"https://rickandmortyapi.com/api/episode/22",
		"https://rickandmortyapi.com/api/episode/23",
		"https://rickandmortyapi.com/api/episode/26",
		"https://rickandmortyapi.com/api/episode/29",
		"https://rickandmortyapi.com/api/episode/30",
		"https://rickandmortyapi.com/api/episode/31",
		"https://rickandmortyapi.com/api/episode/32",
		"https://rickandmortyapi.com/api/episode/33",
		"https://rickandmortyapi.com/api/episode/35",
		"https://rickandmortyapi.com/api/episode/36",
		"https://rickandmortyapi.com/api/episode/38",
		"https://rickandmortyapi.com/api/episode/39",
		"https://rickandmortyapi.com/api/episode/40",
		"https://rickandmortyapi.com/api/episode/41",
		"https://rickandmortyapi.com/api/episode/42",
		"https://rickandmortyapi.com/api/episode/43",
		"https://rickandmortyapi.com/api/episode/44",
		"https://rickandmortyapi.com/api/episode/45",
		"https://rickandmortyapi.com/api/episode/46",
		"https://rickandmortyapi.com/api/episode/47",
		"https://rickandmortyapi.com/api/episode/48",
		"https://rickandmortyapi.com/api/episode/49",
		"https://rickandmortyapi.com/api/episode/50",
		"https://rickandmortyapi.com/api/episode/51"
	],
	"url": "https://rickandmortyapi.com/api/character/5",
	"created": "2017-11-04T19:26:56.301Z"
}
   ```

   
/!\ TO CHECK /!\
- Home page
- Students list from a CSV file - API / Web page
- Student creation (and save in a CSV file) - API / Web page
- Students list from a database - API -------- WEBPAGE A FAIRE
- Student creation (and save in a database) - API -------- WEBPAGE A FAIRE
- Nice responsive look (from normalize.css)
- ESLint set up for clean code
- Authentification (Basic, Multiple users, encrypted passwords)
- Webpage with some graphs
- Ready to deploy
- A page per student
- Update a student
- Menu in the header
- Affichage mobile
- Beautiful CSS
- Ex2 put request
- All API endpoints
- Handle the scenario where the id parameter does not match any student in the details view
- ESLint
- Expliquer le débugger node, les mots de passe chiffré (+comment ajouter des utilisateurs)