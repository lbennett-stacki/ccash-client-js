import React, { useEffect, useState } from 'react';
import { CCashClient } from 'ccash-client-js';
import './App.css';

const client = new CCashClient();

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async function getBalance() {
      setBalance(await client.balance('twix'));
    })();
  }, []);

  return (
    <div className="App">
      <div>
        <strong>Balance:</strong>
        <span>{balance}</span>
      </div>
    </div>
  );
}

export default App;
