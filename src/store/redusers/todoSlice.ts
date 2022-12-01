import {createSlice} from "@reduxjs/toolkit";
import {IStep, ITodo, TodoState} from "./todoTypes";

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
            state.todos.push({
                id: '',
                todoId: Date.now().toString(),
                body: action.payload,
                status: true,
                steps: []
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.todoId !== action.payload)
        },
        setStatus(state, action) {
            state.todos = state.todos.map(todo => {
                if (todo.todoId === action.payload.todoId) {
                    todo.status = action.payload.status
                    todo.steps && (todo.steps = todo.steps.map(step => {
                        step.status = action.payload.status
                        return step
                    }))
                    return todo
                }
                return todo
            })
        },

        setStep(state, action) {
            const currentTodo: ITodo | undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            console.log(currentTodo)
            currentTodo && currentTodo.steps.push({
                id: Date.now().toString(),
                status: true,
                body: action.payload.body
            })
        },
        removeStep(state, action) {
            const currentTodo: ITodo | undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            currentTodo && (currentTodo.steps = currentTodo.steps.filter(step => step.id !== action.payload.id))
        },
        toggleStepStatus(state, action) {
            const currentTodo: ITodo | undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            if (currentTodo) {
                let currentStep: IStep | undefined = currentTodo.steps.find(step => step.id === action.payload.id)
                currentStep && (currentStep.status = !currentStep.status)
            }
        }
    }
})

export const todoReducer = todoSlice.reducer