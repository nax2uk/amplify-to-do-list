import React, { useState, useContext } from 'react';
import TasksContext from '../context/tasks/tasksContext';
import '../css/NewToDoForm.css'

const NewToDoForm = () => {
    /*** TASKS ***/
    const tasksContext = useContext(TasksContext);
    const [err, setErr] = useState("");
    const [task, setTask] = useState("");

    const handleChangeTask = (e) => {
        setTask(e.target.value);
    }

    const handleAddToDo = async (e) => {
        e.preventDefault();
        if (task.trim() === "") {
            setErr("Please enter a task to do!");
        } else {
            tasksContext.addTask({ task, completed: false });
            setTask("");
        }
    }

    const handleCloseAlert = (e) => {
        e.preventDefault();
        setErr("");
    }
    return (
        <>
            <form className='NewTodoForm' onSubmit={handleAddToDo}>
                <label htmlFor="newTask">New To Do:</label>
                <input type="text" id="newTask" placeholder="Enter To Do" value={task} onChange={handleChangeTask} />
                <button>Add</button>
            </form>

            {(err !== "") &&
                <div className="alert">
                    <button className="closebtn" onClick={handleCloseAlert}>&times;</button>
                    <strong>Error!</strong> {err}
                </div>
            }
        </>
    );
};

export default React.memo(NewToDoForm);