export function createTaskCard(todo) { // Changed parameter to 'todo'
    const newCard = document.createElement('div');
    newCard.classList.add('card');
    
    // Check if the task is completed and add the class
    if (todo.completed) {
        newCard.classList.add('completed');
    }

    newCard.innerHTML = `
        <span class="task-text">${todo.task}</span>
        <div class="button-group">
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;
    
    // Add event listeners within the module
    newCard.querySelector('.complete-btn').addEventListener('click', function() {
        newCard.classList.toggle('completed');
        putTask(todo.id, todo)
    });
    newCard.querySelector('.delete-btn').addEventListener('click', function() {
        newCard.remove();
        deleteTask(todo.id); // Call the delete function with the correct ID
    });

    return newCard;
}

export function deleteTask(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            console.log('Task deleted successfully');
        } else {
            console.error('Failed to delete task');
        }
    }).catch(error => console.error('Error deleting task:', error));
}

function putTask(id, updatedTask) {
    fetch(`/todos/${id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task updated successfully:', data);
    })
    .catch(error => console.error('Error updating task:', error));
}