import React, {useState} from "react";
import {useAppDispatch} from "../hooks/redux";
import s from './Todo.module.css'
import {InputBlock} from "./InputBlock";
import Step from "./Step";
import {ITodo} from "../store/redusers/todoTypes";
import {addStep, removeTodo, toggleStatus} from "../store/redusers/todoAsyncTC";

type Props = {
    todo: ITodo
}
export const Todo: React.FC<Props> = (p:Props) => {
    const dispatch = useAppDispatch()
    const [isEditMode, setIsEditMode] = useState(false)

    const onToggleStatus: ()=>void = () => dispatch(toggleStatus(p.todo))
    const onRemove: ()=>void = () => dispatch(removeTodo(p.todo))

    const onAddStep: (body:string)=>void = (body:string) => {
        dispatch(addStep(p.todo, body))
    }
    return (
        <div className={s.root}>
            <div className={s.item}>
                <button className={s.button_status} onClick={onToggleStatus}></button>
                    <span className={`${s.body} ${p.todo.status ? s.active : s.inactive}`}
                          onClick={() => setIsEditMode(!isEditMode)}>
                        {p.todo.body}
                    </span>
                <button className={s.button_remove} onClick={onRemove}>x</button>
            </div>
            {isEditMode && (
                <div>
                    <div className={s.steps_list}>
                        {p.todo.steps && p.todo.steps.map(step => <Step key={step.id}
                                                                        todo={p.todo}
                                                                        step={step}/>
                        )}
                    </div>
                    <InputBlock placeHolderText={'Добавить шаг'} callbackFunction={onAddStep}/>
                </div>
            )}
        </div>
    )
}