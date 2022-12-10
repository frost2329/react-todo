import React from 'react';
import s from "./Step.module.css";
import {useAppDispatch} from "../hooks/redux";
import {IStep, ITodo} from "../store/redusers/todoTypes";
import {removeStep, toggleStepStatus} from "../store/redusers/todoAsyncTC";
import imageRemove from "../images/remove.png"

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
            <button disabled={!p.todo.status} className={`${s.button_status} ${!p.step.status && s.success}`} onClick={onToggleStatus}>
                {!p.step.status && '✓'}
            </button>
            <span className={`${s.body} ${p.step.status ? s.active : s.inactive}`}>{p.step.body}</span>
            <img onClick={onRemove} className={s.button_remove} src={imageRemove} alt="remove"/>
        </div>
    )
}
export default Step;