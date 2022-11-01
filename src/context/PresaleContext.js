/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";
import CoinbaseWalletSDK   from "@coinbase/wallet-sdk";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
//import { WalletConnect }   from "@walletconnect/web3-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
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
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [connectedAccount, setConnectedAccount] = useState();
    const [network, setNetwork] = useState();
    const [web3Signer, setSigner] = useState();
    const [chainId, setChainId] = useState();
    const [accounts, setAccounts] = useState()
    
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
          package: CoinbaseWalletSDK, 
          options: {
            appName: "Ajira Pay Presale",
            infuraId: '4420f3851225491b923a06948965929a'
          }
        },
        walletconnect: {
          package: WalletConnectProvider, //WalletConnect, 
          options: {
            infuraId: '4420f3851225491b923a06948965929a',
            rpc: {56: "https://bsc-dataseed.binance.org/"}
          }
        },
    }

    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        network: 'binance' ,
        disableInjectedProvider: false,
        theme: 'dark',
        accentColor: 'blackWhite'
      });

    const connectWallet = async() =>{
        try {
            //const ALCHEMY_API_KEY = "gFLRjM9BHzU4eIcqDpqu4ue2EcKTBU5O"
            //await web3Modal.clearCachedProvider();
            //const provider = new ethers.providers.AlchemyProvider("optimism",ALCHEMY_API_KEY); 
            const provider = await web3Modal.connect();
            addListeners(provider);
            
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            //const signer = await provider.getSigner();
            //setSigner(signer)
            setConnected(true);
            setProvider(provider);
            setLibrary(library);
            if(accounts){setConnectedAccount(accounts[0]);}
            setNetwork(network);
            localStorage.setItem('isWalletConnected', true)
            console.log(connectedAccount)
            console.log(accounts)
            // const ajiraPayv1TokenContract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, library);
            // const ajiraPayv1TokenPresaleContract = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, library);
            // const ajiraPayv1TokenAirdropContract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, library);

            // console.log(await ajiraPayv1TokenContract.name());
          } catch (error) {
            console.error(error);
        }
    }
    
    const switchNetwork = async () => {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: 80001, }],//toHex(137)
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: 97,//toHex(137),
                  chainName: "Smart Chain - Testnet", //Polygon Mumbai Testnet //Polygon
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"], //https://rpc-mumbai.maticvigil.com/ //https://polygon-rpc.com/ //https://data-seed-prebsc-1-s1.binance.org:8545/
                  blockExplorerUrls: ["https://testnet.bscscan.com"], //https://mumbai.polygonscan.com/ //https://polygonscan.com/
                },
              ],
            });
          } catch (addError) {
            throw addError;
          }
        }
      }
    }; 

    const refreshState = () => {
      setConnectedAccount()
      setConnected(false);
      setAccounts();
      setChainId();
      //setAccount("");
      };
      
      const disconnectWallet = useCallback(async () => {
        //deactivate();
        web3Modal.clearCachedProvider();
        refreshState();
        localStorage.setItem('isWalletConnected', false)
      });

      const addListeners = async(web3ModalProvider) => {
        web3ModalProvider.on("accountsChanged", (accounts) => {
            window.location.reload()
        });

        // Subscribe to chainId change
        web3ModalProvider.on("chainChanged", (chainId) => {
          window.location.reload()
        });
      }

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {

    }
    
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          //connectWallet();
          setConnected(true);
        } catch (ex) {
          console.log(ex)
        }
      }
      // if (web3Modal.cachedProvider) {
      //   connectWallet();
      // }
    }

    useEffect(() => {
      connectWalletOnPageLoad()
      if (provider?.on) {
        const handleAccountsChanged = (accounts) => {
          setAccounts(accounts);
          setConnectedAccount(accounts[0])
        };
    
        const handleChainChanged = (chainId) => {
          setChainId(chainId);
        };
    
        const handleDisconnect = () => {
          //disconnect();
          disconnectWallet()
        };
        
        const handleNetworkChanged = (newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          console.log({ oldNetwork, newNetwork });
          if (oldNetwork) {
            window.location.reload();
          }
        };

        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);
        provider.on('networkChanged', handleNetworkChanged)
     
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
            provider.removeListener("networkChanged", handleNetworkChanged);
          }
        };
        }
    }, [connectWalletOnPageLoad, disconnectWallet, provider]);

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, getActiveAccount, buyToken, library,
            connectedAccount, network, switchNetwork, chainId
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
