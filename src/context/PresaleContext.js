/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";
import CoinbaseWalletSDK   from "@coinbase/wallet-sdk";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import WalletConnect    from "@walletconnect/web3-provider";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

import Web3Modal  from "web3modal";
//require('dotenv').config();

import { ajiraPayTokenV1ContractAddress, 
    ajiraPayPresaleV1ContractAddress, 
    ajiraPayV1AirdropDistributorContractAddress } from '../artifacts/contract_addresses';


import { networkParams } from './utils/networks'

export const PresaleContext = React.createContext();

const ajiraPayPresaleV1Abi = require('../artifacts/abis/AjiraPayV1PrivateSale.json');
const ajiraPayTokenV1Abi = require('../artifacts/abis/AjiraPayV1Token.json');
const ajiraPayV1AirdropDistributorAbi = require('../artifacts/abis/AjiraPayV1AirdropDistributor.json');


export const PresaleContextProvider = ({ children }) => {    
    //const [web3Signer, setSigner] = useState();
    const [chainId, setChainId] = useState();
    const [accounts, setAccounts] = useState()
    const [ethersProvider, setEthersProvider] = useState()
    const [ethersSigner, setSigner] = useState()
    const [presaleContract, setPresaleContract] = useState()
    const [tokenContract, setTokenContract] = useState()
    const [tokenAirdropContract, setTokenAirdropContract] = useState()
  
    //V2 Connection Instance
    const [account, setAccount] = useState()
    const [network, setNetwork] = useState();
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [isConnected, setConnected] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState();
    const [error, setError] = useState("");

    const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK, 
          options: {
            appName: "Ajira Pay Presale",
            infuraId: '4420f3851225491b923a06948965929a',
            // rpc: {56: "https://l2-mainnet.wallet.coinbase.com?targetName=bsc",
            //       97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            //     }
          }
        },
        walletconnect: {
          package: WalletConnect, //WalletConnect, 
          options: {
            infuraId: '4420f3851225491b923a06948965929a',
            // rpc: {56: "https://l2-mainnet.wallet.coinbase.com?targetName=bsc",
            //       97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
            //     }
          }
        },
    }

    const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        //network: 'mainnet' ,
        disableInjectedProvider: false,
        theme: 'dark',
        accentColor: 'blue',
        ethereum: {
          appName: 'web3Modal'
        }
      });

    const connectWallet = async() =>{
        try {
            //const ALCHEMY_API_KEY = "gFLRjM9BHzU4eIcqDpqu4ue2EcKTBU5O"
            //await web3Modal.clearCachedProvider();
            //const provider = new ethers.providers.AlchemyProvider("optimism",ALCHEMY_API_KEY); 
            // const provider = await web3Modal.connect();
            
            // const library = new ethers.providers.Web3Provider(provider);
            // const accounts = await library.listAccounts();
            // const network = await library.getNetwork();
            // const _provider = new ethers.providers.Web3Provider(provider)
            // const signer = _provider.getSigner()
            // const _signer = signer.getAddress();
            // //addListeners(_provider);
            // setEthersProvider(_provider)
            // setSigner(signer)
            // setConnected(true);
            // setProvider(provider);
            // setLibrary(library);
            // if(accounts){setConnectedAccount(accounts[0]);}
            // setNetwork(network);
            // localStorage.setItem('isWalletConnected', true)
            //console.log(connectedAccount)
            //console.log(accounts)
           // loadContracts(_provider)
           // console.log(_signer)
            const provider = await web3Modal.connect()
            const library = new ethers.providers.Web3Provider(provider);
            const signer = library.getSigner()
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            setProvider(provider)
            setLibrary(library)
            localStorage.setItem('isWalletConnected', true)
            if (accounts){
              setConnectedAccount(accounts[0])
              setAccount(accounts[0]);
              setConnected(true);
              console.log(account)
            } 
            setChainId(network.chainId);
            setNetwork(network)

            const _tokenContract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, signer);
            const _presaleContract = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, signer);
            const _airdropContract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, signer);
      
            if(provider){
              setPresaleContract(_presaleContract)
              setTokenContract(_tokenContract)
              setTokenAirdropContract(_airdropContract)
            }

            
          } catch (error) {
            setError(error)
            console.error(error);
        }
    }
    
    const listenToProvider = async() =>{
      try{
        if(provider){
          return provider;
        }
      }catch(error){
        setError(error)
        console.error(error)
      }
    }

    const switchNetwork = async () => {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHex(56) }] //network
        });
        setChainId(56)
       // setNetwork(network.chainId)
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [networkParams[toHex(56)]]
            });
            //setNetwork(56)
          } catch (error) {
            setError(error);
            console.error(error);
          }
        }
      }
    }; 

    const truncateAddress = (address) => {
      if (!address) return "No Account";
      const match = address.match(
        /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
      );
      if (!match) return address;
      return `${match[1]}…${match[2]}`;
    };
    
    const toHex = (num) => {
      const val = Number(num);
      return "0x" + val.toString(16);
    };

    const refreshState = () => {
      setConnectedAccount()
      setConnected(false);
      setAccounts();
      setChainId(null);
      setNetwork(null);
      localStorage.clear();
      // setPresaleContract(null)
      // setTokenContract(null)
      // setTokenAirdropContract(null)
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
    
    const getAjiraPayTokenContract = async() => {
      const contract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, ethersSigner); //ethersSigner
      const name = await contract.name()
      //alert(name)
      return contract;
    }

    const getPresaleContract = async() => {
      const contract = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, ethersSigner); 
      return contract;
    }

    const getAirdropContract = async() => {
      const contract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, ethersSigner); //ethersSigner
      return contract;
    }

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {
      try{
      //   let contract;
      //   let price;
      //   if(isConnected){
      //     contract =  await getPresaleContract()
      //     price = await contract.callStatic.privateSalePricePerTokenInWei();
      //     const formatedPrice = ethers.utils.formatEther(price)
      //     console.log(formatedPrice)
      //     const user = {
      //       'from' : ethersSigner.address,
      //       'amount' : ethers.utils.formatEther(1000000)
      //     }
      //     await contract.contribute({
      //       // {'from':user['from'], 'value': user['value']}
      //           from: user['from'],
      //           value: ethers.utils.formatEther('1'),
      //           gas: '1500000',
      //           gasPrice: '30000000000'
      //     })
      //     //alert(formatedPrice)
      //   }
      //   else{
      //     alert('Please connect Wallet')
      //   }
        
      //   //const _privateSalePrice = await contract.privateSalePricePerTokenInWei();
      //   //const price = ethers.utils.formatUnits(_privateSalePrice, 'ether')
      //   console.log(contract)
      //   //alert(price)
      //  // console.log(price)
      //alert(account)
      alert(presaleContract.callStatic.isPresaleOpen())
      }catch(error){
        setError(error);
        console.error(error);
      }
    }
    
    const disconnect = async() => {
      web3Modal.clearCachedProvider();
      refreshState()
      
    }

    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          //connectWallet();
          setConnected(true);
        } catch (error) {
          setError(error);
          console.error(error);
        }
      }
    }

    const checkPageReload = async() => {
      if (window.performance) {
        console.info("window.performance works fine on this browser");
      }
      console.info(performance.navigation.type);
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        console.info( "This page is reloaded" );
      } else {
        console.info( "This page is not reloaded");
      }
    }

    useEffect(() => {
      listenToProvider()
    }, []);

    useEffect(() => {
      connectWalletOnPageLoad()
    }, []);

    // useEffect(() => {
    //   if (web3Modal.cachedProvider) {
    //     connectWallet();
    //   }
    // }, []);

    useEffect(() => {
      if (provider?.on) {
        const handleAccountsChanged = (accounts) => {
          console.log("accountsChanged", accounts);
          if (accounts) setAccount(accounts[0]);
        };
  
        const handleChainChanged = (_hexChainId) => {
          setChainId(_hexChainId);
          setNetwork(_hexChainId)
        };
  
        const handleDisconnect = () => {
          console.log("disconnect", error);
          disconnect();
        };
  
        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);
  
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [provider]);

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, getActiveAccount, buyToken, library,
            connectedAccount, network, switchNetwork, chainId, presaleContract, tokenContract, tokenAirdropContract,
            getAjiraPayTokenContract, accounts, account, disconnect, truncateAddress, toHex
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
