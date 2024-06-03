import React from 'react';
import './App.css';
import TimeInput from './components/TimeInput';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Joey's Timer
        </p>
      </header>
      <div className='App-main'>
        <TimeInput />
      </div>
    </div>
  );
}

export default App;
