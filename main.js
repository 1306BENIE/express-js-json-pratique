const express = require("express");
const fileSystem = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const filePath = path.join(__dirname, "data", "db.json");

const readData = () => {
    const data = fileSystem.readFileSync(filePath,"UTF-8");
    return data
    
  }


app.get('/tasks', (req, res) => {
    res.status(200).send(readData())
  })


  app.listen(port, () => {
    console.log(`Example app listening on port :http://localhost:${port}/`);
  });