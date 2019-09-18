import React from 'react';
import './App.css';
import Contracts from './pages/Contracts/Contracts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Contracts />
      </ErrorBoundary>
    </div>
  );
}

export default App;
