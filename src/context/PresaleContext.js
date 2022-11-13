/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { BigNumber } from 'ethers';
import Web3Modal  from "web3modal";
//require('dotenv').config();
import swal from 'sweetalert';
import 
{ 
    ajiraPayTokenV1ContractAddress, 
    ajiraPayPresaleV1ContractAddress, 
    ajiraPayV1AirdropDistributorContractAddress,
    testNetAjiraPayAddress,
    testNetPresaleAddress,
    testNetAirdropAddress 
  } 
  from '../artifacts/contract_addresses';

//Testnet AJP Contract: https://testnet.bscscan.com/address/0x82F25F3BDF94Bf9b67853C1CcE074Fd58B90416a#code
//Testnet Presale Contract: https://testnet.bscscan.com/address/0xCb3972A14B6534aC27bb173928C4855Cb1ED7bA9#code
//Testnet Airdrop Distributor Contract: https://testnet.bscscan.com/address/0xAEc7DAFBDF10c14F9705BAB9eb8753d7544877DF#code

import { networkParams } from './utils/networks'

export const PresaleContext = React.createContext();

const ajiraPayPresaleV1Abi = require('../artifacts/abis/AjiraPayV1PrivateSale.json');
const ajiraPayTokenV1Abi = require('../artifacts/abis/AjiraPayV1Token.json');
const ajiraPayV1AirdropDistributorAbi = require('../artifacts/abis/AjiraPayV1AirdropDistributor.json');

//Testnets
const testNetAjiraPayABI = require('../artifacts/abis/ajiraPayTestnest.json')
const testNetPresaleABI = require('../artifacts/abis/testnetPrivateSale.json')

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

    const webModalConnection = useRef()

    const getSignerOrProvider = async() =>{
      const connection = await webModalConnection.current.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const accounts = provider.listAccounts();
      const chainId = provider.getNetwork()
      localStorage.setItem('isWalletConnected', true)
      if (accounts){
        setConnectedAccount(accounts[0])
        setAccount(accounts[0]);
        setConnected(true);
        console.log(account)
      } 
      setChainId(chainId);
      //setNetwork(network)
      console.log(chainId)
      // if(chainId !== 56){
      //   alert('Please switch network to Binance Smart Chain')
      //   throw new Error("Connected to wrong chain, please switch to Binance Smart Chain, mainnet");
      // }
      console.log({
        provider,
        signer
      })
      return {
        'signer': signer,
        'provider': provider
      }
    }

    const providerOptions = {
        coinbasewallet: {
          package: CoinbaseWalletSDK, 
          options: {
            appName: "Ajira Pay Presale",
            infuraId: '4420f3851225491b923a06948965929a',
            chainId: 56,
            //checkPageReload: true
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
        binancechainwallet: {
          package: true,
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
            const connection = await getSignerOrProvider()

            
            //const provider = await web3Modal.connect()
            //const library = new ethers.providers.Web3Provider(provider);
            //const signer = library.getSigner()
            //const accounts = await library.listAccounts();
            //const network = await library.getNetwork();
            const provider = connection.provider
            const signer = connection.signer
            const accounts = await provider.listAccounts();
            const network = await provider.getNetwork();
            setProvider(connection.provider)
            setLibrary(connection.signer)
            //setProvider(provider)
            //setLibrary(library)
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
      if (!address) return "";
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

    const connectV2 = async() => {
      await getSignerOrProvider();
    }

    const getContracts = async() => {
      const connection = await getSignerOrProvider();
      const signer = connection.signer;
      const provider = connection.provider;
      const presaleContractInstance = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, signer); 
      const tokenContractInstance = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, signer);
      const airdropContractInstance = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, signer);

      return {
        'presaleContract': presaleContractInstance,
        'ajiraPayTokenContract': tokenContractInstance,
        'airdropContract': airdropContractInstance
      }
    }

    const buyToken = async(amount) => {
      try{
        //const contracts = await getContracts();

        //const presaleContractInstance = contracts.presaleContract
        //

        //const connection = await webModalConnection.current.connect();//'https://bsc-dataseed.binance.org/' //testnet: https://data-seed-prebsc-1-s1.binance.org:8545/
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');// JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/') //JsonRpcProvider('https://bsc-dataseed.binance.org/') //JsonRpcProvider //WebSocketProvider
        const signer = provider.getSigner()
      
        const testAddress = signer._address
        const presaleContractInstance = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, provider);
        const totalInvestors = await presaleContractInstance.totalInvestors() 

        alert(totalInvestors)
        const val = 250000000000000
        const tx = await presaleContractInstance.callStatic.contribute({
          value: amount //.toString()
        }).then(async (response) => {
          await tx.wait()
          console.log(tx)
          swal(response.data);
        }).catch((error) => {
          
          //const errorLog = JSON.stringify(error)
          //var keys = Object.keys(error);
          const errorData = Object.entries(error);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          console.log(data[0].toString())
          //console.log(keys)
          swal(data[0].toString())
        })
      }catch(error){
        //alert(error.message)
        swal(error.message)
        setError(error);
        console.error(error);
      }
    }
    
    const claim = async() => {
      try{
        //const contracts = await getContracts();

        //const presaleContractInstance = contracts.presaleContract
        //

        //const connection = await webModalConnection.current.connect();//'https://bsc-dataseed.binance.org/' //testnet: https://data-seed-prebsc-1-s1.binance.org:8545/
        const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');// JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/') //JsonRpcProvider('https://bsc-dataseed.binance.org/') //JsonRpcProvider //WebSocketProvider
        const signer = provider.getSigner()
      
        const testAddress = signer._address
        const presaleContractInstance = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, provider);
      
        const tx = await presaleContractInstance.callStatic.claimContribution().then(async (response) => {
          await tx.wait()
          console.log(tx)
          swal(response.data);
        }).catch((error) => {
          
          //const errorLog = JSON.stringify(error)
          //var keys = Object.keys(error);
          const errorData = Object.entries(error);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          console.log(data[0].toString())
          //console.log(keys)
          swal(data[0].toString())
        })
      }catch(error){
        //alert(error.message)
        swal(error.message)
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
      webModalConnection.current = new Web3Modal({
        cacheProvider: true,
        providerOptions,
        //network: '' ,
        disableInjectedProvider: false,
        theme: 'dark',
        accentColor: 'blue',
        ethereum: {
          appName: 'web3Modal'
        }
      });
      console.log(webModalConnection)
    },[web3Modal])

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
            getAjiraPayTokenContract, accounts, account, disconnect, truncateAddress, toHex, claim
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
