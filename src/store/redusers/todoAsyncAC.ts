import {AppDispatch} from "../store";
import axios from "axios";
import {todoSlice} from "./todoSlice";
import {ITodo} from "./todoTypes";

export const toggleStatus = (todo: ITodo) => async (dispatch: AppDispatch) => {
    dispatch(todoSlice.actions.setStatus({todoId: todo.todoId, status: !todo.status}))
}

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
        dispatch(todoSlice.actions.setLoading)
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos`;
        const data: ITodo = {
            id: '',
            todoId: Date.now().toString(),
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

export const removeTodo = (Id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(todoSlice.actions.setLoading)
        const url: string = `https://62f53aa6ac59075124ce14b4.mockapi.io/todos/${Id}`;
        const response = await axios.delete<ITodo>(url)
        dispatch(todoSlice.actions.removeTodo(response.data.todoId))
        dispatch(todoSlice.actions.setError(''))
    } catch (e: any) {
        dispatch(todoSlice.actions.setError(e.message));
    }
}