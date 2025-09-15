import { createTaskCard } from './taskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-text');
    const addButton = document.getElementById('add-btn');
    const taskContainer = document.getElementById('tasks-container');

    // 1. Initial fetch to load existing todos
    fetch('/todos')
        .then(response => response.json())
        .then(todos => {
            todos.forEach(todo => {
                const card = createTaskCard(todo); // Pass the entire todo object
                taskContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching initial todos:', error));

    // 2. Event listener for adding new todos
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task: taskText })
        })
        .then(response => response.json())
        .then(newTodo => {
            // Correctly pass the newTodo object to the createTaskCard function
            const newCard = createTaskCard(newTodo);
            taskContainer.appendChild(newCard);
            taskInput.value = '';
        })
        .catch(error => console.error('Error adding todo:', error));
    });
});