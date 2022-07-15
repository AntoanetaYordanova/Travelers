import { useState } from 'react';

const useLocalStorage = (key, inititalState) => {
    const [state, setState] = useState(() => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : inititalState;
        } catch (err) {
            console.log(err);
            return inititalState;
        }
    });

    const changeState = (newState) => {
        localStorage.setItem(key, JSON.stringify(newState));
        setState(newState);
    };

    return [state, changeState];
};

export default useLocalStorage;
