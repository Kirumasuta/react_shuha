import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Button from "./button/button";
import Input from "./input/input";
import Label from "./label/label";


function GetName() {


    let form = window.innerHeight/2 + 'px';

    const [name, setName] = useState('');
    const [label, setLabel] = useState('');

    const naming = (e) => {
        e.preventDefault();
        if (name === undefined || name.length < 1 || name.length > 25){
            setLabel('Выбери имя в пределах 1-25 символов, иначе ты играть не будешь.')
            return;
        }
        window.localStorage.setItem('name',name);
        setLabel(`Твоё имя - ${name}.`);
    }

    return (
            <div>
                <form className={'formName'} style={{margin:form}}>
                    <Input
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Label value={label}/>
                    <Button onClick={naming}>Выбрать имя</Button>
                    <Link to={'lobby'}>
                        <Button>Играть</Button>
                    </Link>
                </form>
            </div>
        )
}

export default GetName;