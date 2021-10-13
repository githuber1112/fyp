import React from 'react';
import './styles.scss';
import {Select} from 'antd'

const FormSelect = ({ options, defaultValue, handleChange,label, ...otherProps}) => {
    if (!Array.isArray(options) || options.length<1) return null;

    return (
        <div className="formRowSelect">
            {label && (
                <label>
                    {label}
                </label>
            )}

            <Select className="formSelect" value ={defaultValue} onChange ={handleChange} {...otherProps}>
                {options.map((option,index) => {
                    const { value , name } = option;

                    return (
                        <option key={index} value={value}>{name}</option>
                    );
                })}
            </Select>
        </div>

    );
}

export default FormSelect;
