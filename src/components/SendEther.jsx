import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Button from "./Button";

const SendEther = ({web3,account}) => {
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(null);
    const [recipient, setRecipient] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            if(web3 && account) {
                try{
                    const balance = await web3.eth.getBalance(account);
                    const balanceInETH = web3.utils.fromWei(balance, "ether");
                    setBalance(balanceInETH);
                }catch(error) {
                    console.error("Error fetching balance:", error);
                }
            }
        };
        fetchBalance();
    },[web3, account]);

   const send = async () => {
       if(web3 && account) {
        try {
            const sendInWei = web3.utils.toWei(amount, 'ether');
            if(isNaN(amount) || Number(balance) < Number(amount)) {
                alert("Insufficient balance to complete transaction");
                return;
            }

            const transaction = await web3.eth.sendTransaction({
                from: account,
                to:recipient,
                value: sendInWei
            });
            
            console.log(transaction);
            alert("Transaction successful!");

            const newBalance = await web3.eth.getBalance(account);
            setBalance(web3.utils.fromWei(newBalance, "ether"));

            //Limpiamos los valores del input
            setAmount("");
            setAmount(""); //limpiamos el amount despues de transferir
        } catch(error) {
            console.error("Something went wrong sending ether:", error);
            alert("Error sending ether!");
        }
        
       } else {
        console.log("Metamask not detected");
        alert("Please install Metamask!");
       }
    };

    return(
        <div>
             {account && (
                <div>
                    <p>Connected Account: {account.substring(0,6)}...{account.substring(38)}</p>
                    <p>Balance: {balance}</p>
                </div>
            )}
              
            <div>
                <label>Amount to send:</label><br></br>
                <input
                   type="text"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}               
                />
            </div>
            <div>
                <label>Recipient address:</label><br></br>
                <input
                 type="text"
                 value={recipient}
                 onChange={(e) => setRecipient(e.target.value)}
                />
            </div>
            <Button onClick={send}>Send Ether</Button>
             
        </div>
    );
};

export default SendEther;