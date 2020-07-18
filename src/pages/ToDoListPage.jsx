import React, { useEffect, useContext } from 'react';
import * as utils from '../utils/utils';
import TasksContext from '../context/tasks/tasksContext';
import ToDo from '../components/ToDo';
import Loader from '../components/Loader';
import '../css/ToDoList.css';
import NewToDoForm from '../components/NewToDoForm';

function ToDoListPage() {

    /*** TASKS ***/
    const tasksContext = useContext(TasksContext);
    const { isLoading } = tasksContext;

    // renders only on mounting
    useEffect(tasksContext.initArrTasks, []);

    const today = utils.getDate();
    return (
        isLoading ? <Loader />
            :
            <div className='TodoList'>
                <h1>{today}
                    <span>A Simple To Do List Made with React Hooks</span></h1>
                <NewToDoForm />
                <ul>
                    {
                        tasksContext.arrTasks.map(elem => {
                            return (
                                <div className='todo-list' key={elem.id}>
                                    <ToDo task={elem} />
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
    );
}


export default React.memo(ToDoListPage);