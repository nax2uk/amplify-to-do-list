import React, { useReducer, useCallback } from 'react';
import TasksContext from './tasksContext';
import tasksReducer from './tasksReducer';
import * as api from '../../graphql/api';
import {
    EDIT_TASK,
    INIT_ARRTASKS,
    REMOVE_TASK,
    ADD_TASK,
    SET_ERR,
}
    from '../types';

const TasksState = props => {
    const initialState = {
        /*** ARRAY TASKS ***/
        isLoading: true,
        arrTasks: [],
        err: null,
    }

    const [state, dispatch] = useReducer(tasksReducer, initialState);

    const initArrTasks = useCallback(() => {

        const initArr = async () => {

            try {
                const arr = await api.getTasks();
                dispatch({
                    type: INIT_ARRTASKS,
                    payload: {
                        arr,
                    },
                });
            } catch (error) {
                dispatch({
                    type: SET_ERR,
                    payload: {
                        error,
                    }
                })
            }
        }
        initArr();

    }, []);

    const editTask = async (task) => {

        try {
            const editedTask = await api.updateTask(task);

            const index = state.arrTasks.findIndex(currTask => currTask.id === task.id);

            dispatch({
                type: EDIT_TASK,
                payload: {
                    index, editedTask,
                }

            });
        } catch (error) {
            dispatch({
                type: SET_ERR,
                payload: {
                    error
                },
            })
        }
    }

    const removeTask = async (deletedTaskID) => {
        try {
            const id = await api.deleteTask(deletedTaskID);

            dispatch({
                type: REMOVE_TASK,
                payload: {
                    id
                }
            });
        } catch (error) {
            dispatch({
                type: SET_ERR,
                payload: {
                    error
                }
            })
        }
    }
    const addTask = async (task) => {
        try {
            const newTask = await api.addTask(task);

            dispatch({
                type: ADD_TASK,
                payload: {
                    newTask,
                }
            });
        } catch (error) {
            dispatch({
                type: SET_ERR,
                payload: {
                    error
                },
            })
        }
    }

    return (
        <TasksContext.Provider
            value={{
                arrTasks: state.arrTasks,
                isLoading: state.isLoading,
                editTask,
                initArrTasks,
                removeTask,
                addTask,
                err: state.err,
            }}
        >
            {props.children}
        </TasksContext.Provider>
    );
}

export default TasksState;

