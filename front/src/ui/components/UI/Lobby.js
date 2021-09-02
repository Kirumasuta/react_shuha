import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Label from "./label/label";
import Button from "./button/button";
import Modal from "./modal/modal";
import Slider from "./slider/slider";
import Checkbox from "./checkbox/checkbox";

function Lobby (){

    const buttonOffset = window.innerHeight/3;

    const dispatch = useDispatch();
    const hosting = useSelector(state => state.host);

    let data = {auto:'', quantity:''};

    const toHost = (e) => {
        e.preventDefault();
        const host =    <Modal children={[
                                            <Checkbox

                                                key={1}
                                                children={'Автошуха'}/>,
                                            <Slider
                                                key={2}
                                                children={10}/>,
                                            <Link to={{pathname:'/game',data: data}} key={3}>
                                                <Button key={33}
                                                        onClick={(e) => {
                                                            getData(e);
                                                            deleteForm();
                                                        }}
                                                        children={'Играть'}/>
                                            </Link>
                                            ]}
                        />;
        dispatch({type:'host', payload: host});
    }

    const getData = (e) => {
        //e.preventDefault();
        data.auto = e.target.form[0].value;
        data.quantity = e.target.form[1].value;
    }

    const deleteForm = () => {
        document.getElementsByClassName('formName')[0]?.remove();
    }



    return (
        <div>
            {hosting}
            <Label value={window.localStorage.getItem('name')}/>

            <form style={{marginTop: buttonOffset}}>
                <Button
                    children={'Захостить игру'}
                    onClick={toHost}
                />
                <Link to={'/search'}>
                    <Button onClick={deleteForm} children={'Найти игру'}/>
                </Link>
            </form>
        </div>
        )
}

export default Lobby;