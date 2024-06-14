import React, { useState } from 'react';
import './App.css';
import TimeInput from './components/TimeInput';
import ThemeContext, { themes } from './components/theme-context';
import ThemeTogglerButton from './components/theme-toggler-button';
import Example from './components/example';

function App() {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme => (theme === themes.dark ? themes.light : themes.dark));
  };

  // State 也包含了更新函数，因此它会被传递进 context provider。
  const state = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  return (
    <ThemeContext.Provider value={state}>
      <Content />
    </ThemeContext.Provider>
  );
}

function Content() {
  return (
    <>
      <ThemeTogglerButton />
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className="App">
            <header className="App-header" style={{ backgroundColor: theme.background, color: theme.color }}>
              <p>
                Joey's Timer
              </p>
            </header>
            <div className='App-main' style={{ backgroundColor: theme.background, color: theme.color }}>
              <TimeInput />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
      <Example />
    </>
  );
}

export default App;
