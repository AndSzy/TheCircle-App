# The Circle
Authentication app with login, register and access control.
### Technologies
* Node.js
* Express
* Passport
* Mongoose
* bcrypt.js
* EJS
* connect-flash

### Features
* Welcome page with video in background
* Fully responsive login/register form
* JavaScript form validation
* Pop-up messages
* Route protection - passport-local
* Passwords hashed in a secure way
* Login details stored in a database

### Usage
After cloning this repo, go to config/keys.js and provide link to your MongoDB database.
Details of registered users will be stored in the following format:  

`username:"AndSzy",
email:"andszy@mail.com",
password:"$2a$10$MQL4K9hdSjib6umvkKYkeub6PUz3YXMk.o7EzdelPrtnLeNZTLKRu",
date:2020-08-22T19:17:14.209+00:00`  

Password is stored in a secure way and date is added automatically.
