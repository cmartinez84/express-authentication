# Express.js Authorization

This repo is a demo of how to create a simple user authorization using Express.js, browser sessions, and MongoDB, and creates custom middleware for determining user access.
## Prerequisites

You will need npm to install dependencies and MongoDB
https://www.mongodb.com/


## Installation

* `npm install`

## Specifications
Users can sign up and will be directed to a portfolio page.
Nav buttons and options will change based on authorization status.
Attempting to access pages impertinent to user status (eg, viewing the sign in prompt while already signed in) will be redirected to the home page.

## Featured Tech and Modules.
Express, Node, Pug, MongoDB
#Featured NPM Modules
Mongoose, bycrypt, connect-mongo
This demo app authorizes users based on MongoDB queries, stores session data on the db using the connect-mongo module, and encrypts passwords using the bcrypt module. 

## Running / Development

* The optimal way to run this project is to use nodemon. Navigate to project root in the terminal and enter "nodemon". Changes will take effect after every save.
* Visit your app at [http://localhost:3000](http://localhost:3000).


## Known Bugs
_This project's dependencies may not reflect the most current versions. One known deprecation is with connect-mongo. Currently, logging out does not destroy the sessions using the latest version of the module. For connect-mongo, make sure your version if  1.2.1_


  ### License
  The MIT License (MIT)

  Copyright (c) 2018 **_Chris Martinez_**
