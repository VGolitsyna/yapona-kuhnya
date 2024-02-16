import {useState} from 'react';

const useValidInput = () => {
    const [value, setValue] = useState('');
    const [wasTouch, setWasTouch] = useState(false);
    const [itHasError, setItHasError] = useState(false)


    const inputOnChange = (e) => {
        setValue(e.target.value);
        setWasTouch(true);
        setItHasError(false);
    }

    const inputOnBlur = (e) => {
        setWasTouch(true);
        if (e.target.value.trim() === ''){
            setItHasError(true);
        }
    }

    return {
        value,
        wasTouch,
        itHasError,
        inputOnChange,
        inputOnBlur
    }

}

export default useValidInput;