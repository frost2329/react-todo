import s from "./InputBlock.module.css";
import React, {useState} from "react";

type Props = {
    callbackFunction: (body:string)=> void
    placeHolderText: string
}
export const InputBlock: React.FC<Props> = (p:Props) => {
    const [inputValue, setInputValue] = useState('')
    const onButtonAdd: ()=>void = () => {
        p.callbackFunction(inputValue)
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
            {inputValue &&<button className={`${s.button_add}`}
                                  onClick={onButtonAdd}>
                +
            </button>}
        </div>
    )
}