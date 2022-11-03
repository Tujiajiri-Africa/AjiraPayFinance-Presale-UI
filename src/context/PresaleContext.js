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
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

import Web3Modal  from "web3modal";
//require('dotenv').config();

import { ajiraPayTokenV1ContractAddress, 
    ajiraPayPresaleV1ContractAddress, 
    ajiraPayV1AirdropDistributorContractAddress } from '../artifacts/contract_addresses';

  
export const PresaleContext = React.createContext();

const ajiraPayPresaleV1Abi = require('../artifacts/abis/AjiraPayV1PrivateSale.json');
const ajiraPayTokenV1Abi = require('../artifacts/abis/AjiraPayV1Token.json');
const ajiraPayV1AirdropDistributorAbi = require('../artifacts/abis/AjiraPayV1AirdropDistributor.json');


export const PresaleContextProvider = ({ children }) => {
    const [isConnected, setConnected] = useState(false);
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [connectedAccount, setConnectedAccount] = useState();
    const [network, setNetwork] = useState();
    //const [web3Signer, setSigner] = useState();
    const [chainId, setChainId] = useState();
    const [accounts, setAccounts] = useState()
    const [ethersProvider, setEthersProvider] = useState()
    const [ethersSigner, setSigner] = useState()
    const [presaleContract, setPresaleContract] = useState()
    const [tokenContract, setTokenContract] = useState()
    const [tokenAirdropContract, setTokenAirdropContract] = useState()
  
  
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
          package: WalletConnectProvider, //WalletConnect, 
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
       // network: 'mainnet' ,
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
            const provider = await web3Modal.connect();
            
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();
            const _provider = new ethers.providers.Web3Provider(provider)
            const signer = _provider.getSigner()
            const _signer = signer.getAddress();
            //addListeners(_provider);
            setEthersProvider(_provider)
            setSigner(signer)
            setConnected(true);
            setProvider(provider);
            setLibrary(library);
            if(accounts){setConnectedAccount(accounts[0]);}
            setNetwork(network);
            localStorage.setItem('isWalletConnected', true)
            //console.log(connectedAccount)
            //console.log(accounts)
           // loadContracts(_provider)
           // console.log(_signer)


            const _tokenContract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, signer);
            const _presaleContract = new ethers.Contract(ajiraPayPresaleV1ContractAddress, ajiraPayPresaleV1Abi, signer);
            const _airdropContract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, signer);
      
            setPresaleContract(_presaleContract)
            setTokenContract(_tokenContract)
            setTokenAirdropContract(_airdropContract)


            console.log(presaleContract)
          } catch (error) {
            console.error(error);
        }
    }
    
    const switchNetwork = async () => {
      try {
        await ethersProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: 97 }],//toHex(137)
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethersProvider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: 97,//toHex(137),
                  chainName: "Smart Chain - Testnet",
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
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
      setConnected();
      setAccounts();
      setChainId();
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
        let contract;
        let price;
        if(isConnected){
          contract =  await getPresaleContract()
          price = await contract.callStatic.privateSalePricePerTokenInWei();
          const formatedPrice = ethers.utils.formatEther(price)
          console.log(formatedPrice)
          const user = {
            'from' : ethersSigner.address,
            'amount' : ethers.utils.formatEther(1000000)
          }
          await contract.contribute({
            // {'from':user['from'], 'value': user['value']}
                from: user['from'],
                value: ethers.utils.formatEther('1'),
                gas: '1500000',
                gasPrice: '30000000000'
          })
          //alert(formatedPrice)
        }
        else{
          alert('Please connect Wallet')
        }
        
        //const _privateSalePrice = await contract.privateSalePricePerTokenInWei();
        //const price = ethers.utils.formatUnits(_privateSalePrice, 'ether')
        console.log(price)
        //alert(price)
       // console.log(price)
        //alert(price)
      }catch(error){
        console.log(error)
      }
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
          disconnectWallet()
        };
        
        const handleNetworkChanged = (newNetwork, oldNetwork) => {
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
            connectedAccount, network, switchNetwork, chainId, presaleContract, tokenContract, tokenAirdropContract,
            getAjiraPayTokenContract, accounts
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
