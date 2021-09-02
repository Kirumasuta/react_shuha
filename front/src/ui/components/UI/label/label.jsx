import React from 'react';
import cl from './label.module.css'

const Label = ({value, ...props}) => {
    return (
        <div {...props} className={cl.label}>
            {value}
        </div>
    );
};

export default Label;