import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore } from 'redux'
import { rootReducer } from './reducers';
import { Provider } from 'react-redux'

const store = createStore(rootReducer, undefined);

// dispatch messages that have target of redux
window.addEventListener('message', event => {
    const message = event.data; // The json data that the extension sent
    if(message.target === 'redux'){
        store.dispatch(message.action)
    }
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root') as HTMLElement
);
