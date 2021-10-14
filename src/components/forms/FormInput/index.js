import React from 'react';
import './styles.scss';
import { Input } from 'antd'

const FormInput = ({ handleChange, label, ...otherProps }) =>{
    return (
        <div className="formRow">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <Input className="formInput" onChange={handleChange} {...otherProps}/>    

        </div>
    )
}

export default FormInput;