import {createSlice} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";


export type IStep = {
    id: string
    body: string,
    status: boolean
}

export type ITodo = {
    id: string,
    todoId: string
    body: string,
    status: boolean
    steps: IStep[]
}


export interface TodoState {
    todos: ITodo[]
    isLoading: boolean,
    error: string
}
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
        setTodo(state, action) {

            state.todos.push({
                id:'',
                todoId:Date.now().toString(),
                body: action.payload,
                status:true,
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
            const currentTodo :ITodo|undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            console.log(currentTodo)
            currentTodo && currentTodo.steps.push({
                id: Date.now().toString(),
                status: true,
                body: action.payload.body
            })
        },
        removeStep(state, action) {
            const currentTodo :ITodo|undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            currentTodo && (currentTodo.steps = currentTodo.steps.filter(step=> step.id !== action.payload.id))
        },
        toggleStepStatus(state, action) {
            const currentTodo :ITodo|undefined = state.todos.find(todo => todo.todoId === action.payload.todoId)
            if (currentTodo) {
                let currentStep: IStep | undefined = currentTodo.steps.find(step => step.id === action.payload.id)
                currentStep && (currentStep.status = !currentStep.status)
            }
        },
        /*
        fetchTodosSuccess(state, action) {
            state.isLoading = false
            state.todos = action.payload
            state.error = ''
        },
        postTodoSuccess(state, action) {
            state.isLoading = false
            state.todos.push(action.payload)
            state.error = ''
        },
        deleteTodoSuccess(state, action) {
            state.isLoading = false
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
            state.error = ''
        },
        */
    }
})
export const toggleStatus = (todo:ITodo) => async (dispatch: AppDispatch) => {
    dispatch(todoSlice.actions.setStatus({todoId: todo.todoId, status: !todo.status}))
    //dispatch(stepsSlice.actions.setStatusStepsForTodo({todoId: todo.todoId, status: !todo.status}))
}
/*
export const postTodo = (body:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(todoSlice.actions.setLoading)
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const data: ITodo = {id:'', localId:Date.now().toString(), body, status:TodoStatus.ACTIVE}
        const response = await axios.post<ITodo>(url, data)
        dispatch(todoSlice.actions.postTodoSuccess(response.data))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}
export const removeTodo = (id:string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(todoSlice.actions.setLoading)
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const response = await axios.delete<ITodo>(url +`/${id}`)
        console.log(response)
        dispatch(todoSlice.actions.deleteTodoSuccess(response.data.id))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}
export const getTodos = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(todoSlice.actions.setLoading())
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const response = await axios.get<ITodo[]>(url)
        console.log(response)
        dispatch(todoSlice.actions.fetchTodosSuccess(response.data))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}
*/


export const todoReducer = todoSlice.reducer