import React, {useState} from 'react';
import cl from './checkbox.module.css'

const Checkbox = ({children, ...props}) => {

    const [state,setState] = useState('');



    return (
        <div style={{textAlign: "center", marginLeft: -40}}>
            <label>
                    <span className={cl.checkbox_label}>{children}</span>
                    <input
                        {...props}
                        value={state}
                        onChange={e => {setState(e.target.checked)}}
                        style={{opacity:1, pointerEvents: "auto"}}
                        type="checkbox"
                        className={cl.checkbox}
                    />
            </label>
        </div>
    );
};

export default Checkbox;