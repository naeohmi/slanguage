# Project 2 (SLANGUAGE)
-----------------------

An app to help people learn English slang, to communicate effectively with native English speakers.

## Wireframes
----------

![image of first wire-frame]
(./first-frame.jpg)

![image of second wire-frame]
(./second-frame.jpg)

## User Stories
------------
As a user, I want to send text messages to my friends who speak English as a native/first language. I want to understand their slang and use it appropriately. As a user, I want to input a text message and immediately see a definition of the slang words, abbreviations, and/or hashtags used. I want to save the word and accompanying definitions to use again later, when I'm studying my English. I want to edit the definitions to make them uniquely tailored to me and save those edits for future use. As a user I would like to have the option of translating the English definitions into my native language, so I can thoroughly understand the concept. 

## Pseudocode
----------
![image of second wire-frame]
(/images/second-frame.jpg)

## ERD or other visual representation of your database
---
This can be a basic markdown table with some text or a full on ERD. Check [this](https://www.lucidchart.com/pages/how-to-draw-ERD) for a quick intro to how to draw an ERD. They also have a good tool to help you actually draw it.

## Technologies used
-----------
* Node.js (including: nodemon, passport, bluebird, pg-promises, and more!)
* Express.js
* PostgreSQL
* JavaScript
* jQuery
* HTML
* CSS
* and more...

## Download Project & Install
----------------

This is a very important step and one that you did not need in your first project. When you have a project with a server and a database you need to give instructions to the end user on how to run it. the following is a good example of what this might look like.

1. [Git clone or download this project]('https://github.com/andres-maza/project-2')
2. Create a PostgreSQL database called 'project_2_db'
3. On your terminal, run psql -d project_2_db -f migrations/migrations.sql
4. If you haven't already, install nodemon package (npm install -g nodemon)
5. Run nodemon, app should be available on localhost:3000