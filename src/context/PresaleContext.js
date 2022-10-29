import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";
//import CoinbaseWalletSDK   from "@coinbase/wallet-sdk";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
//import { WalletConnect }   from "@walletconnect/web3-provider";
//import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal  from "web3modal";
//require('dotenv').config();

import { ajiraPayTokenV1ContractAddress, 
    ajiraPayPresaleV1ContractAddress, 
    ajiraPayV1AirdropDistributorContractAddress } from '../artifacts/contract_addresses';

  
export const PresaleContext = React.createContext();

const ajiraPayPresaleV1Abi = require('../artifacts/abis/AjiraPayV1PrivateSale.json');
const ajiraPayTokenV1Abi = require('../artifacts/abis/AjiraPayV1Token.json');
const ajiraPayV1AirdropDistributorAbi = require('../artifacts/abis/AjiraPayV1AirdropDistributor.json');

// const getContract = async() => {

// }

export const PresaleContextProvider = ({ children }) => {
    const [isConnected, setConnected] = useState(false);
    const [web3Provider, setProvider] = useState();
    const [web2Library, setLibrary] = useState();
    const [connectedAccount, setConnectedAccount] = useState();
    const [network, setNetwork] = useState();
    const [web3Signer, setSigner] = useState();
    
    //const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const { active, connector, activate, deactivate } = useWeb3React()

    const CoinbaseWallet = new WalletLinkConnector({
        url: `https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a`,
        appName: "Web3-react Demo",
        darkMode: true,
        supportedChainIds: [1, 3, 4, 5, 42, 56],
    });
       
    const WalletConnect = new WalletConnectConnector({
        rpcUrl: `https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a`,
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
            infuraId: 'https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a'
          }
        },
        walletconnect: {
          package: WalletConnect, 
          options: {
            infuraId: 'https://mainnet.infura.io/v3/4420f3851225491b923a06948965929a'
          }
        },
    }

    const web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        network: 'mainnet' ,
        disableInjectedProvider: false,
        theme: 'dark',
        accentColor: 'blackWhite'
      });

    const connectWallet = async() =>{
        try {
            //const ALCHEMY_API_KEY = "gFLRjM9BHzU4eIcqDpqu4ue2EcKTBU5O"

            //const provider = new ethers.providers.AlchemyProvider("optimism",ALCHEMY_API_KEY); 
            const provider = await web3Modal.connect();
            
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            //const signer = await provider.getSigner();
            //setSigner(signer)
            setConnected(true);
            setConnectedAccount(accounts[0]);
            setProvider(provider);
            setLibrary(library);
            setNetwork(network);
            localStorage.setItem('isWalletConnected', true)
            console.log(connectedAccount)
            const ajiraPayv1TokenContract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, library);
            const ajiraPayv1TokenPresaleContract = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, library);
            const ajiraPayv1TokenAirdropContract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, library);

            console.log(await ajiraPayv1TokenContract.name());
          } catch (error) {
            console.error(error);
        }
    }
    
    const refreshState = () => {
        setConnected(false);
        //setAccount("");
      };
      
      const disconnectWallet = async () => {
        web3Modal.clearCachedProvider();
        refreshState();
        localStorage.setItem('isWalletConnected', false)
      };

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {

    }
    
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          setConnected(true);
        } catch (ex) {
          console.log(ex)
        }
      }
    }

    useEffect(() => {
      connectWalletOnPageLoad()
    }, []);

    return (
        <PresaleContext.Provider value={{
            isConnected, web3Provider, connectWallet, disconnectWallet, getActiveAccount, buyToken, web2Library, connectedAccount, network
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
