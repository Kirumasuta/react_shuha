import React, {useEffect, useState} from 'react';
import cl from './slider.module.css'
import Input from "../input/input";

const Slider = ({children, value, ...props}) => {

    let coordSlots = [];
    let elem;
    let quantity;
    const [sliderW, setSliderW] = useState(0);
    const [q, setQ] = useState('3');

    //Circle finding after full load of <Slider />
    useEffect(()=>{


        for (let i = 0; i < children-2; i++){
            coordSlots[i] = [document.getElementsByClassName(cl.count)[0].children[i].offsetLeft - 17,
                             document.getElementsByClassName(cl.count)[0].children[i].id];
        }
        elem = document.getElementById('slider');
        dragElHor(elem);
    })
    function dragElHor(elem){
        let pos1 = 0, pos3 = 0, pos4 = 0;
        elem.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elem.style.top = 150 + "px";
            elem.style.left = (elem.offsetLeft - pos1) + "px";
            if(parseInt(elem.style.left, 10) < 10){
                quantity = 3;
                elem.style.left = 10 + 'px';
            } else if (parseInt(elem.style.left, 10) > 320){
                quantity = 10;
                elem.style.left = 320 + 'px';
            }

            setSliderW(elem.offsetLeft);
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
            setPosCircle();
        }

    }

    const setSlot = () => {
        const slot = [];
        for (let i = 2; i < children; i++){
            slot.push(<div style={{display: "inline-block", marginLeft:31}}  key={i+1} id={i+1}>{i+1}</div>);
        }
        return slot;
    }

    function setPosCircle() {
        let dif=1000;
        let pos;
        for (let i = 0; i< coordSlots.length; i++){
            if(Math.abs(elem.offsetLeft-coordSlots[i][0]) < dif){
                dif = elem.offsetLeft-coordSlots[i][0];
                pos = coordSlots[i][0];
                quantity = coordSlots[i][1];
            }
        }
        setQ(quantity);
        elem.style.left = pos+ 'px';
        setSliderW(elem.offsetLeft);
    }

    return (
        <div>

            <div className={cl.slider}>
                <div className={cl.back_slider} style={{width:sliderW, marginLeft:0}}></div>
                <div id={'slider'} className={cl.circle}>

                </div>
                <Input value={q} style={{display:'none'}} onChange={()=>''}/>
            </div>

            <div className={cl.count}>
                {setSlot()}
            </div>
        </div>
    );
};

export default Slider;