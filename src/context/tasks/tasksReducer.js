import { EDIT_TASK, INIT_ARRTASKS, REMOVE_TASK, ADD_TASK, SET_ERR } from '../types';

const tasksReducer = (state, action) => {
    switch (action.type) {
        case EDIT_TASK:
            return {
                ...state,
                arrTasks: [...state.arrTasks.slice(0, action.payload.index), action.payload.editedTask, ...state.arrTasks.slice(action.payload.index + 1)],
            }
        case INIT_ARRTASKS:
            return {
                ...state,
                arrTasks: action.payload.arr,
                isLoading: false,
            }
        case REMOVE_TASK:
            return {
                ...state,
                arrTasks: state.arrTasks.filter(task => task.id !== action.payload.id),
            }
        case ADD_TASK:
            return {
                ...state,
                arrTasks: [...state.arrTasks, { ...action.payload.newTask }],
            }
        case SET_ERR:
            return {
                ...state,
                err: action.payload.error,
            }
        default: return state;
    }
}
export default tasksReducer;