import React, {useEffect, useState} from 'react';
import './App.module.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {Todo} from "./components/Todo";
import s from './App.module.css'
import {InputBlock} from "./components/InputBlock";
import {getTodos, postTodo} from "./store/redusers/todoAsyncTC";
import {ITodo} from "./store/redusers/todoTypes";

const App: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isSuccessOpen, setIsSuccessOpen] = useState(true)
    const [isActiveOpen, setIsActiveOpen] = useState(true)
    const todoState = useAppSelector(state => state.todo)

    const todosSuccess: ITodo[] = todoState.todos.filter(todo => !todo.status)
    const todosActive: ITodo[] = todoState.todos.filter(todo => todo.status)

    const onAddTodo: (body: string) => void = async (body: string) => {
        await dispatch(postTodo(body))
        setIsActiveOpen(true)
    }


    useEffect(() => {
        dispatch(getTodos())
    }, [])

    if (todoState.isLoading) {
        return <div>Загрузка</div>
    }
    return (
        <div className={s.App}>
            <div className={s.wrapper_app}>
                <div className={s.todos_wrapper}>
                    <InputBlock placeHolderText={'Добавить задачу'} callbackFunction={onAddTodo}/>
                    {todosActive.length > 0 && (
                        <div className={s.type}>
                            <div onClick={() => setIsActiveOpen(!isActiveOpen)} className={s.type_name}>
                                Активные
                            </div>
                            {isActiveOpen && todosActive.length > 0 && todosActive.map(todo => {
                                return <Todo key={todo.id} todo={todo} setIsSuccessOpen={setIsSuccessOpen}/>
                            })}
                        </div>
                    )}
                    {todosSuccess.length > 0 && (
                        <div className={s.type}>
                            <div onClick={() => setIsSuccessOpen(!isSuccessOpen)} className={s.type_name}>
                                Выполненные
                            </div>
                            {isSuccessOpen && todosSuccess.length > 0 && todosSuccess.map(todo => {
                                return <Todo key={todo.id} todo={todo} />
                            })}
                        </div>
                    )}
                </div>
            </div>
            {todoState.error && <div className={s.error}>{todoState.error}</div>}
        </div>
    );
}

export default App;
