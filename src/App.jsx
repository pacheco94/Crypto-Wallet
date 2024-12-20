import { useState } from 'react'
import Web3 from 'web3';
import Connect from './components/Connect';
import SendEther from './components/SendEther';

import './App.css'

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  return (
    <div className='container'>
      <h1>Crypto Wallet</h1>
      <Connect setWeb3={setWeb3} setAccount={setAccount}/>
      {web3 && account && <SendEther web3={web3} account={account} />} 
    </div>
  );
};

export default App
