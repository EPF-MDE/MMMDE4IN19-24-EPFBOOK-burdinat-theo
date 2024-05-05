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
		* [GET requests](#get-requests)
		* [POST requests](#post-requests)
		* [PUT requests](#put-requests)
	* [Website](#website)
		* [Home page](#home-page)
		* [From CSV database](#from-csv-database)
		* [From MongoDB database](#from-mongodb-database)
		* [Data visualization page](#data-visualization-page)
		* [Student details / Update student's data](#student-details--update-students-data)
	* [Other features](#other-features)
		* [ESLint](#eslint)
		* [Responsive](#responsive)
		* [Basic Authentification (web/api/add users)](#basic-authentification-webapiadd-users)
		* [Handle the scenario where the id parameter does not match any student in the details view](#handle-the-scenario-where-the-id-parameter-does-not-match-any-student-in-the-details-view)

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

##### Get the data from all students stored in the CSV file

```bash	
GET http://localhost:3000/api/students
```

##### Get the data from all students stored in MongoDB

```bash
GET http://localhost:3000/api/students/from-db
```

##### Get the data from a specific student stored in the CSV

```bash
GET http://localhost:3000/api/students/:id
```

#### POST requests

>In this section you should use json format to input student's data :
```json
{"name": "Théo BURDINAT", "school": "EPF"}
```

##### Add a student to the CSV database

```bash	
POST http://localhost:3000/api/students/create
```

##### Add a student to the MongoDB database

```bash	
POST http://localhost:3000/api/students/create-in-db
```

##### Update student's info in the CSV

```bash	
POST http://localhost:3000/api/students/:id
```

#### Login endpoint to try setting cookies after login

```bash	
POST http://localhost:3000/api/login
```

#### PUT requests

##### Update student's info in the CSV

```bash	
PUT http://localhost:3000/api/students/:id
```

### Website

#### Home page

> http://localhost:3000/

This page provide a nice homepage with a header that display a menu to navigate through the app. This menu is available from all the different pages.

#### From CSV database

##### Students list

> http://localhost:3000/students

This page display all the students stored in the CSV file. You can click on a student name to go to his details page, or click on the button at the end of the list to add new students.

##### Student creation

> http://localhost:3000/students/create

This page is a student creation form. You can type information about the student you want to add to the CSV database, then click on the "Add" button. A popup will tell you if everything worked well.

#### From MongoDB database

##### Students list

> http://localhost:3000/students/from-db

This page display all the students stored in the MongoDB database. You can click on the button at the end of the list to add new students.

##### Student creation

> http://localhost:3000/students/create-in-db

This page is a student creation form. You can type information about the student you want to add to the MongoDB database, then click on the "Add" button. A popup will tell you if everything worked well.

#### Data visualization page

> http://localhost:3000/students/data

This page allows you to display some interesting plots about students' stress busters and try to show the best stress busters to avoid health issues during the lockdown (The top one seems to be online gaming).

#### Student details / Update student's data

> http://localhost:3000/students/:id

This page display all the data of the id's student. On this page, you can update the profile of the student using the form, pre-filled with student's information and clicking on the update button. This method is using a POST request.

If you prefere to use a PUT request, you can click on the button "Update with PUT method", that will redirect you to the next page:

> http://localhost:3000/students/:id/update

On this page, you have an update form prefilled with student's information. When you click on the "Update" button, data of the student will be updated using a PUT request.

### Other features

#### ESLint

This project use ESLint to maintain a good code quality. You can check the code quality using the following command:
```bash
npm run eslint
```

#### Responsive

The application is responsive and can be used on mobile devices. All not essential long paragraphs are removed on the mobile version, and the menu and the different forms will adapt to the size of your device.

#### Handle the scenario where the id parameter does not match any student in the details view

If you try to access a student's details page for a non-existing id, you will be redirected to a "Student not found" page.

#### Basic Authentification

The app is using basic authentification on all its pages. You can use the app using the following credentials right after the setup:

| Username | Password |
|----------|----------|
| admin    | admin    |

You can add new users to the app by adding them in the *users.csv* file. As passwords are encrypted you have to encrypt your password before adding it to the file. To do so, run the hashPassword script:

```bash
./scripts/hashPassword.js
```

To connect on the API, you have to use a basic authentification Authorizer header. To know what you have to put inside, run these line and copy the result:

```js
node //Switch to node terminal
> "Basic " + Buffer.from("username:password").toString("base64");
```

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