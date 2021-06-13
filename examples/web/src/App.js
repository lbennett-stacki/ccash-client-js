import React, { useEffect, useState } from 'react';
import { CCashClient } from 'ccash-client-js';
import './App.css';

const client = new CCashClient(
  process.env.CCASH_API_BASE_URL || 'https://wtfisthis.tech/BankF'
);

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async function getBalance() {
      setBalance(await client.balance('blinkblinko'));
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
