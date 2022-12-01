import s from "./InputBlock.module.css";
import React, {useState} from "react";
import {useAppDispatch} from "../hooks/redux";

type Props = {
    callbackAction: any
    todoId?: string
    placeHolderText: string
}
export const InputBlock: React.FC<Props> = (p:Props) => {
    const dispatch = useAppDispatch()
    const [inputValue, setInputValue] = useState('')

    const onButtonAdd: ()=>void = () => {
        p.todoId
            ? dispatch(p.callbackAction({body: inputValue, todoId: p.todoId}))
            : dispatch(p.callbackAction(inputValue))
        setInputValue('')
    }
    return (
        <div className={s.root}>
            <input className={s.input}
                   onChange={e => setInputValue(e.target.value)}
                   type="text"
                   value={inputValue}
                   placeholder={p.placeHolderText}>
            </input>
            {inputValue && <button className={s.button_add} onClick={onButtonAdd}>Добавить</button>}
        </div>
    )
}