import React, {useEffect, useRef} from 'react';
import './App.module.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {todoSlice} from "./store/redusers/todoSlice";
import {Todo} from "./components/Todo";
import s from './App.module.css'
import {InputBlock} from "./components/InputBlock";

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const isMount = useRef(false)
    const todoState = useAppSelector(state => state.todo)
    const onAddTodo: (body:string)=>void = (body:string) => {
        dispatch(todoSlice.actions.setTodo(body))
        //postTodo(body);
    }
    useEffect(() => {
        if (isMount) {
            window.localStorage.setItem('todoState', JSON.stringify(todoState))
        }
        isMount.current = true}, [todoState])

    if (todoState.isLoading) {
        return <div>Загрузка</div>
    }
    if (todoState.error) {
        return <div>{todoState.error}</div>
    }
    return (
        <div className={s.App}>
            <div className={s.wrapper_app}>
                <div className={s.todos_wrapper}>
                    <InputBlock placeHolderText={'Добавить задачу'} callbackFunction={onAddTodo}/>
                    {todoState.todos.length > 0 && todoState.todos.map(todo => {
                        return <Todo key={todo.id} todo={todo}/>})}
                </div>

            </div>
        </div>
    );
}

export default App;
