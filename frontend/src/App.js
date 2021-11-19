import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  return (
    <div className="App">
      <header className="App-header">
        <p>To-do List</p>
      </header>
      <div className="List">
    
      </div>
    </div>
  );
}

export default App;
