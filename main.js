const express = require("express");
const fileSystem = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const filePath = path.join(__dirname, "data", "db.json");

const readData = () => {
    const data = fileSystem.readFileSync(filePath,"UTF-8");
    return JSON.parse(data);
  }
  const writeData = (data) => {
    fileSystem.writeFileSync(filePath, data, "utf-8");
    return JSON.parse(data);  
  }

app.get('/tasks', (req, res) => {
  const data = readData();
    res.status(200).json(data);
  })

  app.get('/tasks/:id', (req, res) => {
    const data = readData();
    const taskID = req.params.id;
    const task = data.find(task => task.id === taskID);
    if(!task) {
      return res.status(404).send("Task not found");
    }
    res.status(200).json(task);
  })

  app.put('/tasks/:id', (req, res) => {
    const data = readData();
    const taskID = req.body.id;
    const taskINDEX = data.findIndex(task => task.id === taskID);
    if(taskINDEX === -1) {
      return res.status(404).send("Task not found");
    }
    data[taskINDEX] = {...data[taskINDEX], ...req.body}
    writeData(data)
    res.status(200).send(data[taskINDEX])
  })

d
app.listen(port, () => {
    console.log(`Example app listening on port :http://localhost:${port}/`);
  });