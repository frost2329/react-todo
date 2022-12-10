import React, {useState} from "react";
import {useAppDispatch} from "../hooks/redux";
import s from './Todo.module.css'
import {InputBlock} from "./InputBlock";
import Step from "./Step";
import {ITodo} from "../store/redusers/todoTypes";
import {addStep, removeTodo, toggleStatus} from "../store/redusers/todoAsyncTC";
import imageRemove from "../images/remove.png";

type Props = {
    todo: ITodo
    setIsSuccessOpen?: any
}
export const Todo: React.FC<Props> = (p:Props) => {
    const dispatch = useAppDispatch()
    const [isEditMode, setIsEditMode] = useState(false)

    const onToggleStatus: ()=>void = async () => {
        await dispatch(toggleStatus(p.todo))
        p.setIsSuccessOpen && p.setIsSuccessOpen(true)
    }
    const onRemove: ()=>void = () => dispatch(removeTodo(p.todo))

    const onAddStep: (body:string)=>void = (body:string) => {
        dispatch(addStep(p.todo, body))
    }
    return (
        <div className={s.root}>
            <div className={s.item}>
                <button className={`${s.button_status} ${!p.todo.status && s.success}`} onClick={onToggleStatus}>
                    {!p.todo.status && '✓'}
                </button>
                    <span className={`${s.body} ${p.todo.status ? s.active : s.inactive}`}
                          onClick={() => setIsEditMode(!isEditMode)}>
                        {p.todo.body}
                    </span>
                <img onClick={onRemove} className={s.button_remove} src={imageRemove} alt="remove"/>
            </div>
            {isEditMode && (
                <div>
                    <div className={s.steps_list}>
                        {p.todo.steps && p.todo.steps.map(step => <Step key={step.id}
                                                                        todo={p.todo}
                                                                        step={step}/>
                        )}
                    </div>
                    {p.todo.status && <InputBlock placeHolderText={'Добавить шаг'} callbackFunction={onAddStep}/>}
                </div>
            )}
        </div>
    )
}