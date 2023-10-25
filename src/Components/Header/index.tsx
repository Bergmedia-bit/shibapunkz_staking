import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import logo from '../../cover.png';
import Web3 from "web3";
function Header() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window as any;
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);

  useEffect(() => {
    const initializeMetamask = async () => {
      const web3 = new Web3(Web3.givenProvider);
      const accounts = await  web3.eth.getAccounts((error, accounts) => {
        if (!error && accounts.length > 0) {
          const userAddress = accounts[0];
          // User has authorized access to their accounts
          const address = accounts[0];
          // Wallet is connected
         
      
          setAccountAddress(accounts[0]);
          
          setIsConnected(true);
        } else {
          console.error('Error getting user address:', error);
        }
      });
  
        
    
    };
  
    // Call the initialization function
    initializeMetamask();
  
    // Your additional logic for both scenarios
    // get_campign();
  }, []);
  
  const checkMetamaskAvailability = async () => {
    if (!ethereum) {
      sethaveMetamask(false);
    }
    sethaveMetamask(true);
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
        setIsConnected(false); // Ensure isConnected is set to false
      } else {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        if (accounts.length > 0) {
          // Wallet is connected
          let balance = await provider.getBalance(accounts[0]);
          let bal = ethers.utils.formatEther(balance);
          setAccountAddress(accounts[0]);
          setAccountBalance(bal);
          setIsConnected(true);
          // Reload the screen
        window.location.reload();
        } else {
          // No accounts provided by the user, so the wallet is not connected.
          setIsConnected(false);
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setIsConnected(false);
    }
  };
  



  return (
    <div>
      {haveMetamask ? (
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div>
        {isConnected ? (
          <button className="--btn">
            {accountAddress.slice(0, 4)}...
            {accountAddress.slice(38, 42)}
          </button>
        ) : (
          <button className="--btn" onClick={connectWallet}>
            Connect
          </button>
        )}
      </div>
    </header>
    
     
      ) : (
        <p>Please Install MataMask</p>
      )}
    </div>
  );
}

export default Header;