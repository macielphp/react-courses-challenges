import styled from 'styled-components';
import React, { useState } from 'react';

const ButtonContainer = styled.button`
    padding: 10px;
    border: 1px solid #CDCDCD;
    background-color:rgb(19, 19, 37);
    // width: 100px;
    // height: 107px;
    font-size: 20px;
    flex: 1;
    color: #fff;
    &:hover{
        background-color: #CDCDCD;
    }
`
const Button = ({label, onClick, onKeyDown}) => {
    return (
        <ButtonContainer onClick={onClick} onKeyDown={onKeyDown}>
            {label}
        </ButtonContainer>
    )
}
export default Button