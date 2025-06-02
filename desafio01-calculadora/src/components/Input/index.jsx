import styled from 'styled-components';

const InputContainer = styled.div`
    width: 100%;
    height: 75px;

    display: flex;
    align-items: center;
    justify-content: end;

    font-size: 28px;
    font-family:Roboto;

    input {
        width: 100%;
        height: 75px;
        padding: 0 20px;

        background-color:rgb(134, 197, 245);

        border: 0;
        text-align: right;
        font-size: 45px;

    };
    input:focus{
        outline: none;
        box-shadow: none;
        border: none
    }
`

const Input = ({ value }) => {
    return(
        <InputContainer>
            <input type="text" disabled value={value}/>
        </InputContainer>
    )    
}
export default Input;