import React, {useLayoutEffect, useState} from 'react';
import cl from './modal.module.css'
import cross from "../../../cross.png";
import {useDispatch} from "react-redux";

const Modal = ({children,...props}) => {

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [w,h] = useWindowSize();

    const dispatch = useDispatch();

    const hostQuit = () => {
        document.getElementsByClassName('theme')[0].style.filter = 'brightness(100%)';
        dispatch({type:'hostQuit', payload: document.getElementsByClassName(cl.shading_theme)[0].innerHTML = ''});
    };

    return (
        <div className={cl.shading_theme} style={{width:w, height:h}}>
            <div {...props} className={cl.modal}>
                <img alt={''} onClick={ () => hostQuit()} className='cross' src={cross}/>
                <form>
                    {children}
                </form>
            </div>
        </div>

    );
};

export default Modal;