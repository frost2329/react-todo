import {createSlice} from "@reduxjs/toolkit";
import {ITodo, TodoState} from "./todoTypes";

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: ''
}

const getTodoState: () => TodoState = () => {
    const data = window.localStorage.getItem('todoState')
    return data ? JSON.parse(data) : initialState
}
export const todoSlice = createSlice({
    name: 'todo',
    initialState: getTodoState(),
    reducers: {
        setLoading(state) {
            state.isLoading = true
        },
        setError(state, action) {
            state.isLoading = false
            state.error = action.payload
        },
        setAllTodos(state, action) {
            state.todos = action.payload
        },
        setTodo(state, action) {
            let currentTodo: ITodo | undefined = state.todos.find(todo => todo.id === action.payload.id)
            if (currentTodo) {
                state.todos = state.todos.map(todo=> todo.id === action.payload.id ? action.payload : todo)
            }else {
                state.todos.push(action.payload)
            }
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }
    }
})

export const todoReducer = todoSlice.reducer