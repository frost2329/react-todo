import React from 'react';
import s from "./Step.module.css";
import {todoSlice} from "../store/redusers/todoSlice";
import {useAppDispatch} from "../hooks/redux";
import {IStep} from "../store/redusers/todoTypes";

type Props = {
    todoId: string,
    todoStatus: boolean
    step: IStep
};
const Step: React.FC<Props> = (p: Props) => {
    const dispatch = useAppDispatch()
    const onToggleStatus: ()=>void = () => {
        dispatch(todoSlice.actions.toggleStepStatus({todoId: p.todoId, id: p.step.id}))
    }
    const onRemove: ()=>void = () => {
        dispatch(todoSlice.actions.removeStep({todoId: p.todoId, id: p.step.id}))
    }
    return (
        <div className={s.root}>
            <button disabled={!p.todoStatus} className={s.button_status} onClick={onToggleStatus}></button>
            <span className={`${s.body} ${p.step.status ? s.active : s.inactive}`}>{p.step.body}</span>
            <button className={s.button_remove} onClick={onRemove}>x</button>
        </div>
    )
}
export default Step;