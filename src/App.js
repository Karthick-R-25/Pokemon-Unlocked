import React from 'react';
import CardsList from './Components/CardsList';
import './App.css';


const App = () => {
  return (
    <div className="app">
      <h2 className='heading'>Pokemon Unlocked</h2>
      <CardsList />
    </div>
  );
};

export default App;

