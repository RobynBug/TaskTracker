import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Helper Functions for File Operations ---
const readTodos = () => {
    try {
        const todosData = fs.readFileSync('./todos.json', 'utf8');
        return JSON.parse(todosData);
    } catch (error) {
        return [];
    }
};

const writeTodos = (todos) => {
    fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
};

// --- API Endpoints ---

app.get('/todos', (req, res) => {
    const todosArray = readTodos();
    res.json(todosArray); 
});

app.post('/todos', (req, res) => {
    const { task } = req.body; 

    if (!task) {
        return res.status(400).json({ error: 'Task cannot be empty' });
    }

    const todosArray = readTodos();
    
    const newId = todosArray.length > 0 ? Math.max(...todosArray.map(todo => todo.id)) + 1 : 1;
    
    const todoWithId = { id: newId, task, completed: false };

    todosArray.push(todoWithId);

    writeTodos(todosArray);

    res.status(201).json(todoWithId);
});

app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todosArray = readTodos();

    const index = todosArray.findIndex(todo => todo.id === todoId);

    if (index !== -1) {
        todosArray.splice(index, 1);
        writeTodos(todosArray);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id, 10);
    const todosArray = readTodos();

    const todoToUpdate = todosArray.find(todo => todo.id === todoId);

    if (todoToUpdate) {
        // Toggle the completed status
        todoToUpdate.completed = !todoToUpdate.completed;

        // Write the updated array back to the file
        writeTodos(todosArray);

        // Send back the updated todo item
        res.status(200).json(todoToUpdate);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});