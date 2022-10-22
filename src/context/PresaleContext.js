import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";
//import CoinbaseWalletSDK   from "@coinbase/wallet-sdk";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
//import { WalletConnect }   from "@walletconnect/web3-provider";
import Web3Modal  from "web3modal";
// import {
//     VStack,
//     useDisclosure,
//     Button,
//     Text,
//     HStack,
//     Select,
//     Input,
//     Box
//   } from "@chakra-ui/react";
//require('dotenv').config();

export const PresaleContext = React.createContext();

// const getContract = async() => {

// }

export const PresaleContextProvider = ({ children }) => {
    const [isConnected, setConnected] = useState(false);
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [account, setAccount] = useState();
    const [network, setNetwork] = useState();
    
    // const { activate, deactivate } = useWeb3React();

    const CoinbaseWallet = new WalletLinkConnector({
        url: `https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a}`,
        appName: "Web3-react Demo",
        darkMode: true,
        supportedChainIds: [1, 3, 4, 5, 42, 56],
    });
       
    const WalletConnect = new WalletConnectConnector({
        rpcUrl: `https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a}`,
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
    });
       
    // const Injected = new InjectedConnector({
    //     supportedChainIds: [1, 3, 4, 5, 42, 56],

    // });

    const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWallet, 
          options: {
            appName: "Ajira Pay Presale",
            infuraId: '4420f3851225491b923a06948965929a'//process.env.INFURA_KEY 
          }
        },
        walletconnect: {
          package: WalletConnect, 
          options: {
            infuraId: '4420f3851225491b923a06948965929a'//process.env.INFURA_KEY 
          }
        },
    }

    const web3Modal = new Web3Modal({
        cacheProvider: true, // very important
        providerOptions,
        network: 'mainnet' ,
        disableInjectedProvider: false,
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
            console.log(account)
          } catch (error) {
            console.error(error);
        }
    }

    const refreshState = () => {
        setConnected(false);
        //setAccount("");
      };
      
      const disconnectWallet = async () => {
        await web3Modal.clearCachedProvider();
        refreshState();
      };

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {

    }
    
    useEffect(() => {
        // const provider = window.localStorage.getItem("provider");
        // if (provider) connectWallet();
    }, []);

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, getActiveAccount, buyToken, library, account, network
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
