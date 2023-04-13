# learning-backend

# Connecting to database

### Setting up work space

github => create new repo => code => create codespace

## Create a new container configuration

open command palet => type coedespace => choose dev container configuration (first option) => choose create a new configuration => type node.js => choose Nodejs and Mongo DB devcontainers (third option) (`This will install code nodejs and mongodb along with it`) => choose the default version (first option) => ok

- click on rebuild

- mongodb window opens up click form and connect then close the window

- to open mongodb window again => command palet => mongodb

### initilalize node application

- npm init
- index.js file in the root folder
- create src folder
- create app.js file inside src

### in the package.json file

"type": "mobile", => Allow us to write module based code
"main": "index.js",
"scripts": {
"start": "node index.js",
"dev": "nodemon index.js",
}

### install below packages

- npm i express mongoose dotenv
- npm i -D node mon

## Create an express app

app.js

```js
import express from "express";
const app = express();
export default app;
```

- index.js

## database connection

[database connection Link](https://mongoosejs.com/docs/connections.html)

[database events Link](https://express.js.com/en/4x/api.html)

[database event on Link](https://express.js.com/en/5x/api.html#app.onamount)

```js
import mongoose from "mongoose";
import app from "./app/js";
//mongoose is a simple client or a middle client which helps us to talk our application to mongodb

//To handle initial connection errors, you should use try/catch with async/await.
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecomm");
    console.log("DB CONNECTED");

    // Below code let express talk to database
    // There can be error thaat express might throw in that case fire a call back
    app.on("error", (err) => {
      console.erroe("Error:", err);
      throw err;
    });
    const onListening = () => {};

    app.listen(5000, onListening);
  } catch (err) {
    console.log("Error:", err);
    throw err;
  }
})();
```

# npm run start

=======================================

## Create New

create .env file in the root folder

```js
PORT = 5000;
MONGO_DB=mongodb://localhost:27017/ecomm
```

## create config folder in src

[dotenv doc](https://www.npmjs.com/package/dotenv)

- create index.js file inside config folder

- ./src/config/index.js

```js
import dotenv from "dotenv";
// initialize dotconfig
dotenv.config();

const config = {
    //either use the port from process.env, if you don't have this, then user PORT 5000
    PORT.process.env.PORT || 5000
    // use MONGO_DB from process.env, if it is not available then use the variable from index.js file
    MONGO_URL: process.env.MONGO_DB || "mongodb://localhost:27017/ecomm"
}

export default config
```

=> Go to index.js and import this config
// since config is an object we can access the mongodb url from it (line # 6)
// access config in line # 12 and 14 instead of port

- index.js

```js
import mongoose from "mongoose";
import app from "app";
import config from "./src/config/index.js";
(async () => {
    try {
        await mongoose.connect(config.MONGO_URL)
        console.log("DB CONNECTED")

        app.on("error", (err) => {
        console.log("Error:"; err);
        throw err;
        })
    }
})();
```
