import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    {id: 1,
    text: 'Doctor Appt'
    ,day: 'Feb 21st at 2:45pm',
    reminder: true,
},
{id: 2,
    text: "Field trip",
    day: "Mar 1st at 12:45pm",
    reminder: true,
},

{id: 3,
    text: 'Book Club',
    day: 'Mar 10th at 6:45pm',
    reminder: true,
}

])

//Delete Task
const deleteTask = (id) => {
  setTasks(tasks.filter((task) => task.id !== id))
}

  //Reminder

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
  }
  
  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />

  ) : (
    'No tasks available'
  )}
    </div>
  );


}



export default App;
