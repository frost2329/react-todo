import React from 'react';
import s from "./Step.module.css";
import {useAppDispatch} from "../hooks/redux";
import {IStep, ITodo} from "../store/redusers/todoTypes";
import {removeStep, toggleStepStatus} from "../store/redusers/todoAsyncTC";

type Props = {
    todo: ITodo,
    step: IStep,
};
const Step: React.FC<Props> = (p: Props) => {
    const dispatch = useAppDispatch()
    const onToggleStatus: ()=>void = () => {
        dispatch(toggleStepStatus(p.todo, p.step.id))
    }
    const onRemove: ()=>void = () => {
        dispatch(removeStep(p.todo, p.step.id))
    }
    return (
        <div className={s.root}>
            <button disabled={!p.todo.status} className={s.button_status} onClick={onToggleStatus}></button>
            <span className={`${s.body} ${p.step.status ? s.active : s.inactive}`}>{p.step.body}</span>
            <button className={s.button_remove} onClick={onRemove}>x</button>
        </div>
    )
}
export default Step;