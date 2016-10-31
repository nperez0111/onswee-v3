import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.localStorage = {
    getItem: a => null,
    setItem: (a) => a
}

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});
