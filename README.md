<div style="text-align: center;">
    <img src="https://www.effseit.fr/public/img/medium/logoepfpng_642580bd3298c0.78845696.png" alt="EPF Logo" width="200">
</div>

# EPFBook - Your Own Social Network

EPFBook is a web-based social networking platform created as a project for the Web Programming course with Node.js, Express and MongoDB.

## Table of contents

* [Installation](#installation)
	* [Pre-requisites](#pre-requisites)
	* [Setup](#setup)
* [Usage](#usage)
* [Features](#features)
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
...

## Features
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