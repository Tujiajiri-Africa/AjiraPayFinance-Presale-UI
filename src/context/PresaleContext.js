import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

require('dotenv').config();

export const PresaleContext = React.createContext();

const getContract = async() => {

}

export const PresaleContextProvider = ({ children }) => {
    const [isConnected, setConnected] = useState(false);
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    
    const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK, 
          options: {
            appName: "Ajira Pay Presale",
            infuraId: process.env.INFURA_KEY 
          }
        },
        walletconnect: {
          package: WalletConnect, 
          options: {
            infuraId: process.env.INFURA_KEY 
          }
        }
    }

    const web3Modal = new Web3Modal({
        providerOptions 
      });

    const connectWallet = async() =>{
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider);
            setLibrary(library);
            setAccount(accounts[0]);
            setNetwork(network);
            setConnected(true);
          } catch (error) {
            console.error(error);
        }
    }

    const disconnectWallet = async() => {

    }

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {

    }
    
    useEffect(() => {
        //add functions here
    }, []);

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, getActiveAccount, buyToken, library, account, network
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
