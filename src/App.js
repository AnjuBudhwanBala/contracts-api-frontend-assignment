import React from 'react';
import './App.css';
import FetchedContracts from './pages/FetchedContracts/FetchedContracts';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <FetchedContracts />
      </ErrorBoundary>
    </div>
  );
}

export default App;
