
import React, {useState} from "react";
import Button from "./Button";
import AccountListener from "./AccountListener";
import Web3 from "web3";

const Connect = ({setWeb3, setAccount}) => {
  const connectMetamask = async () => {
      if(typeof window !== 'undefined') {
        try{
            const web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({method:'eth_requestAccounts'});
            setWeb3(web3);
            setAccount(accounts[0]);
        }catch(error) {
            console.error("Error connecting metamask!", error);
        }
     } else {
        console.log('Metamak not detected');
        alert('Please install metamask!');
     }
  };
   //parte de escucha de la cuenta conectada
   const handleAccountChange = (accounts) => {
    if(accounts.length > 0) {
        setAccount(accounts[0]);
    }
    
   };


    return(
        <div>
             <Button onClick={connectMetamask}>Connect to Metamask</Button>
             <AccountListener onAccontChange={handleAccountChange} />
             
        </div>
    );
};

export default Connect;