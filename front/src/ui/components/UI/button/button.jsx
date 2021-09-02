import React from 'react';
import cl from './button.module.css'

const Button = ({children, ...props}) => {
    return (
        <button {...props} className={cl.button}>
            {children}
        </button>
    );
};

export default Button;