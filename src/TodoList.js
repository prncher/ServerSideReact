import { useState } from 'react';
import './style1.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const addTask = () => {
        const exist = taskName.includes('Value already exist');
        if (!exist && taskName) {
            setTasks([...tasks, { name: taskName, completed: false }]);
            setTaskName(t => '');
        }
    }
    const completeTask = (index) => {
        const copyTasks = tasks.map((t, i) => {
            if (i === index) { t.completed = !t.completed; }
            return t;
        });
        setTasks(copyTasks);
    }
    const deleteTask = (index) => {
        const remainingTasks = tasks.filter((t, i) => i !== index);
        setTasks(remainingTasks);
    }
    return <div className="App">
        <div id="container">
            <div id="tasksList">
                {tasks.map((t, i) => <div className={t.completed ? "completedTask" : "task"}
                    key={i}
                    onClick={() => completeTask(i)}
                >Name: {t.name}<button onClick={(e) => { e.stopPropagation(); deleteTask(i) }}>Delete</button></div>)}
            </div>
            <div>
                <div>
                    <span>Completed Tasks : {tasks.filter(t => t.completed).length}</span>
                </div>
                <input type="text" value={taskName}
                    onChange={(e) => {
                        const exist = tasks.filter(t => t.name === e.target.value);
                        //                 console.log(exist.length);
                        setTaskName(exist.length ? e.target.value + ' Value already exist' : e.target.value);
                    }}>
                </input>
                <input type="button" className={"addButton"} onClick={addTask} value='ADD'></input>
            </div>
        </div>
    </div>;
}

export default TodoList;