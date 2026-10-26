import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Store the message returned by the backend
  const [message, setMessage] = useState('Loading...');

  // Fetch the data once when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/api/info')
      .then((res) => res.json())
      .then((data) => setMessage(data.info))
      .catch(() => setMessage('Could not connect to the backend.'));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Node.js</h1>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
