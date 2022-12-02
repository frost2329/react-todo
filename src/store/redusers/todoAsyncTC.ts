import {AppDispatch} from "../store";
import axios from "axios";
import {todoSlice} from "./todoSlice";
import {ITodo} from "./todoTypes";


export const getTodos = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(todoSlice.actions.setLoading())
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const response = await axios.get<ITodo[]>(url)
        dispatch(todoSlice.actions.setAllTodos(response.data))
        dispatch(todoSlice.actions.setError(''))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const postTodo = (body: string) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const data: ITodo = {
            id: '',
            body,
            status: true,
            steps: []
        }
        const response = await axios.post<ITodo>(url, data)
        dispatch(todoSlice.actions.setTodo(response.data))
        dispatch(todoSlice.actions.setError(''))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const removeTodo = (todo: ITodo) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${todo.id}`;
        const response = await axios.delete<ITodo>(url)
        dispatch(todoSlice.actions.removeTodo(response.data.id))
        dispatch(todoSlice.actions.setError(''))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const toggleStatus = (todo: ITodo) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${todo.id}`;
        const data = {...todo, status: !todo.status, steps: todo.steps.map(step => ({...step, status: !todo.status}))}
        console.log(todo);
        console.log(data);
        const response = await axios.put<ITodo>(url, data)
        dispatch(todoSlice.actions.setTodo(response.data))
        dispatch(todoSlice.actions.setError(''));
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const addStep = (todo: ITodo, body: string) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${todo.id}`
        const data = {
            ...todo, steps: [...todo.steps, {
                id: Date.now().toString(),
                status: true,
                body: body
            }]
        }
        const response = await axios.put<ITodo>(url, data)
        dispatch(todoSlice.actions.setTodo(response.data))
        dispatch(todoSlice.actions.setError(''));
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const removeStep = (todo: ITodo, stepId: string) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${todo.id}`
        const data = {...todo, steps: todo.steps.filter(step => step.id !== stepId)}
        const response = await axios.put<ITodo>(url, data)
        dispatch(todoSlice.actions.setTodo(response.data))
        dispatch(todoSlice.actions.setError(''));
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

export const toggleStepStatus = (todo: ITodo, stepId: string) => async (dispatch: AppDispatch) => {
    try {
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${todo.id}`
        const data = {
            ...todo,
            steps: todo.steps.map(step => step.id === stepId ? {...step, status: !step.status} : step)
        }
        const response = await axios.put<ITodo>(url, data)
        dispatch(todoSlice.actions.setTodo(response.data))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}

