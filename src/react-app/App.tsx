import * as React from 'react';
import './App.css';
import { useSelector } from 'react-redux'
import { postMessage } from './messenger';

import { GlobalState } from 'src/shared/store';

function App () {
    const activeEditor = useSelector<GlobalState, string>(state => state.activeEditor);
    const counter = useSelector<GlobalState, number>(state => state.counter);


    const increment = () => postMessage({
        type: 'INCREMENT_COUNTER'
    });

    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <div>Active Editor: <pre>{activeEditor}</pre></div>
            <div>Counter: {counter}
                <button onClick={increment} >Increment</button>
            </div>
          </p>
        </div>
      );
}

export default App;