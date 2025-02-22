const fs = require('fs');
const path = require('path');
const express = require('express');
const port  = 3000

const app = express();

const dataPath = path.join(__dirname, 'data', 'db.json');
app.use(express.json());

// la fonction helper pour lire le fichier
const readData = () => {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

// la fonction helper pour écrire le fichier
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data), 'utf-8');
}


app.get('/', (req, res) => {
  res.status(200).send("Welcome BENIE !!");
})

// GET : récupérer tous les utilisateurs
app.get('/tasks', (req, res) => {
  const data = readData();
  res.status(200).json(data);
});

// GET : récupérer un utilisateur par son ID
app.get('/tasks/:id', (req, res) => {
  const data = readData();
  const taskID = parseInt(req.params.id);
  const task = data.find(item => item.id === taskID);
  if (!task) {
    res.status(404).send("Task not found");
  }
  res.status(200).json(task);
});

// Mettre a jour un nouvel utilisateur

app.put('/tasks/:id', (req, res) => {
  const data = readData();
  const taskID = parseInt(req.params.id);
  const taskIndex = data.findIndex(item => item.id === taskID);

  if (taskIndex === -1){
    res.status(404).send("Task not found");
    return;
  }

  data[taskIndex] = {...data[taskIndex], ...req.body}
  writeData(data);

  res.status(200).json(data[taskIndex]);
}); 

// Ajouter un nouvel utilisateur

app.post('/tasks/', (req, res) => {
  const data = readData();
  const newTask = {id: data.length + 1, ...req.body};
  data.push(newTask);
  writeData(data);

  res.status(201).json(newTask);
});

// Supprimer un utilisateur
app.delete('/tasks/:id', (req, res) => {
  const data = readData();
  const taskID = parseInt(req.params.id);
  const taskIndex = data.findIndex(item => item.id === taskID);

  if (taskIndex === -1){
    res.status(404).send("Task not found");
    return;
  }

  data.splice(taskIndex, 1);
  writeData(data);

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});