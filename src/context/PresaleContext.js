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
import Web3 from 'web3';

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

import { Audio, Oval, ColorRing } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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

const { ethereum } = window

export const PresaleContextProvider = ({ children }) => {    
    //const [web3Signer, setSigner] = useState();
    
    const [accounts, setAccounts] = useState()
    const [ethersProvider, setEthersProvider] = useState()
    const [ethersSigner, setSigner] = useState()

  
    //V2 Connection Instance
    const [account, setAccount] = useState()
    const [network, setNetwork] = useState();
    const [provider, setProvider] = useState();
    const [library, setLibrary] = useState();
    const [isConnected, setConnected] = useState(false);
    const [connectedAccount, setConnectedAccount] = useState();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState();
    const [chainId, setChainId] = useState();
    const [presaleContract, setPresaleContract] = useState()
    const [tokenContract, setTokenContract] = useState()
    const [tokenAirdropContract, setTokenAirdropContract] = useState()
    const [connectionLibrary, setConnectionlibrary] = useState()

    //Contract Specific
    const [totalTokenContributionByUser, setTotalTokenContributionByUser] = useState()
    const [totalWeiContributionByUser, setTotalWeiContributionByUser] = useState()
    const [presalePhase1Price, setPresalePhase1Price] = useState()
    const [presalePhase2Price, setPresalePhase2Price] = useState()
    const [phase1TotalTokensBought, setPhase1TotalTokensBought] = useState()
    const [phase2TotalTokensBought, setPhase2TotalTokensBought] = useState()
    const [totalWeiRaised, setTotalWeiRaised] = useState()

    const webModalConnection = useRef()

    const showPageLoader = async() => {
      return (
      <>
      <div >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      </div>
    </>
      )
    }

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


    const getSignerOrProvider = async() =>{
      const connection = await webModalConnection.current.connect();
      setConnectionlibrary(connection)
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const accounts = provider.listAccounts();
      const network_connection = provider.getNetwork()
      //console.log(await accounts)
      setLibrary(provider)
      setNetwork(network_connection)
      setChainId(await network_connection.chainId);
      localStorage.setItem('isWalletConnected', true)
      if (accounts){
        setConnectedAccount(await accounts[0])
        setAccount(accounts[0]);
        setConnected(true);
        console.log(account)
      }           
      //await console.log(network_connection)
     // console.log(await network_connection.chainId)
      // if(chainId !== toHex(56)){
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
            chainId: toHex(56),
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
        // binancechainwallet: {
        //   package: true,
        // },
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
            //getSignerOrProvider()

            
            // //const provider = await web3Modal.connect()
            // //const library = new ethers.providers.Web3Provider(provider);
            // //const signer = library.getSigner()
            // //const accounts = await library.listAccounts();
            // //const network = await library.getNetwork();
            const provider = connection.provider
            const signer = connection.signer
            const accounts = await provider.listAccounts();
            const network = await provider.getNetwork();
            setProvider(connection.provider)
            setLibrary(connection.provider)
            // //setProvider(provider)
            // setLibrary(library)
            localStorage.setItem('isWalletConnected', true)
            if (accounts){
              setConnectedAccount(accounts[0])
             
              //console.log(account)
            } 
            setChainId(network.chainId);
            setAccount(accounts[0]);
            setConnected(true);
            ///setNetwork(network)
            //console.log(network)
           
            if(provider){
              const _tokenContract = new ethers.Contract(ajiraPayTokenV1ContractAddress, ajiraPayTokenV1Abi, signer);
              const _presaleContract = new ethers.Contract(testNetPresaleAddress, testNetPresaleABI, signer);
              const _airdropContract = new ethers.Contract(ajiraPayV1AirdropDistributorContractAddress, ajiraPayV1AirdropDistributorAbi, signer);
              setPresaleContract(_presaleContract)
              setTokenContract(_tokenContract)
              setTokenAirdropContract(_airdropContract)
              
              //LOAD CONTRACT DATA
              const tokenAmount = await _presaleContract.totalTokenContributionsByUser(accounts[0])
              const tokenValue = ethers.utils.formatEther(tokenAmount)
              setTotalTokenContributionByUser(tokenValue)

              const bnbAmount = await _presaleContract.totalBNBInvestmentsByIUser(accounts[0])
              const bnbValue = ethers.utils.formatEther(bnbAmount)
              setTotalWeiContributionByUser(bnbValue)

              const totalWeiRaised = await _presaleContract.totalWeiRaised()
              const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
              setTotalWeiRaised(totalWeiRaisedVal)

              const phase1PricePerToken = await _presaleContract.totalWeiRaised()
              const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
              setPresalePhase1Price(phase1PricePerTokenVal)

              const phase2PricePerToken = await _presaleContract.totalWeiRaised()
              const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
              setPresalePhase2Price(phase2PricePerTokenVal)
            }
          } catch (error) {
            setError(error)
            console.error(error);
        }
    }
  
    const switchNetwork = async () => {
      try {
        await library.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ 
            chainId: toHex(56),
            
          }] 
        });
        setChainId(toHex(56))
        setConnected(true);
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await library.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                chainId: toHex(56),
                chainName:'Smart Chain',
                rpcUrls:['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls:['https://bscscan.com'],
                nativeCurrency: { 
                  symbol:'BNB',   
                  decimals: 18
                }        
              }
                
              ]
            });
            //setNetwork(56)
          } catch (error) {
            setError(error);
            console.error(error);
          }
        }
      }
    }; 

    const refreshState = () => {
      setConnectedAccount()
      setConnected();
      setAccounts();
      setChainId();
      setNetwork();
      localStorage.setItem('isWalletConnected', false)
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
    
    const buyToken = async(amount) => {
      try{
        const presaleContractInstance = presaleContract
        const tx = await presaleContractInstance.contribute({value: amount, gasLimit: 250000}).then(async(response) => {
          await tx.wait()
          console.log(tx)
          //swal(response.data);
          //console.log(response)
          //swal(response)
          const errorData = Object.entries(response);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          console.log(data[0])
          var link= document.createElement('a');
          link.href =  data[0] 
          swal({
            icon: "success",
            success: true,
            button: {
              confirm: true,
            },
            title: 'Purchase Request Submitted Successfully',
            dangerMode: false,
            text: `View Progress on Explorer: ${data[0]}`,
            content: {
              element: "href",
            },
          })
        }).catch((error) => {
          console.log(error)
          const errorData = Object.entries(error);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          console.log(data[0])
          
          swal(data[0])
        })
      }catch(error){
        
        swal(error.message)
        setError(error);
        console.error(error);
      }
    }
    
    const claim = async() => {
      try{
        const presaleContractInstance = presaleContract
        const tx = await presaleContractInstance.claimContribution().then(async (response) => {
          const errorData = Object.entries(response);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          swal({
            icon: "success",
            success: true,
            button: {
              confirm: true,
            },
            title: 'Claim Request Submitted Successfully',
            dangerMode: false,
            text: `View Progress on Explorer: ${data[0]}`,
            content: {
              element: "href",
            },
          })
          
        }).catch((error) => {
          
          const errorData = Object.entries(error);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          console.log(data[0])
          swal(data[0])
        })
      }catch(error){
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
      // if(webModalConnection.current.cacheProvider){
      //   connectWallet();
      // }
      if (localStorage?.getItem('isWalletConnected') === 'true') {
        try {
          //connectWallet();
          setConnected(true);
          // if(chainId !== 56){
          //   setChainId(56);
          //   alert('Switch To Binance Smart Chain Mainnet')
          // }
        } catch (error) {
          setError(error);
          console.error(error);
        }
      }
    }

    const refreshAccountContributionData = async(account) => {
      if(library !== undefined){
        console.log(library)
        try{
          const presaleContractInstance = presaleContract
          console.log(presaleContract)
          const tokenAmount = await presaleContractInstance.totalTokenContributionsByUser(account)
          const tokenValue = ethers.utils.formatEther(tokenAmount)
          setTotalTokenContributionByUser(tokenValue)
    
          const bnbAmount = await presaleContractInstance.totalBNBInvestmentsByIUser(account)
          const bnbValue = ethers.utils.formatEther(bnbAmount)
          setTotalWeiContributionByUser(bnbValue)
    
          console.log(bnbValue)
          console.log(tokenValue)
        }catch(error){
          console.log(error)
        }
      }else{
        console.log('provider not detected')
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
      //console.log(webModalConnection)
    },[web3Modal])

    useEffect(() => {
      connectWalletOnPageLoad()
    }, []);

    // useEffect(() => {
    //   if (web3Modal.cachedProvider) {
    //     getSignerOrProvider()
    //     //webModalConnection.current.connect()
    //     //setConnected(true)
    //   }
    // }, [webModalConnection]);

    useEffect(() => {
      if (connectionLibrary?.on) {
        const handleAccountsChanged = async(accounts) => {
          //console.log("accountsChanged", accounts);
          setConnectedAccount(accounts[0])
          setAccount(accounts[0]);
          setConnected(true);
          refreshAccountContributionData(accounts[0])
        };
      
        const handleChainChanged = async(chainId) => {
          try{
            //console.log(chainId.toString())
            //console.log("chainChanged", chainId);
          //console.log(chainId)
            const chain = parseInt(chainId)
            setChainId(chain);
            setConnected(true);
            //console.log(chain)
            window.location.reload()
            //await getSignerOrProvider()
          }catch{
            console.log(error)
          }
        };

        const handleDisconnect = () => {
          console.log("disconnected");
          disconnect();
        };
  
        connectionLibrary.on("accountsChanged", handleAccountsChanged);
        connectionLibrary.on("chainChanged", handleChainChanged);
        connectionLibrary.on("disconnect", handleDisconnect);
  
        return () => {
          if (connectionLibrary.removeListener) {
            connectionLibrary.removeListener("accountsChanged", handleAccountsChanged);
            connectionLibrary.removeListener("chainChanged", handleChainChanged);
            connectionLibrary.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [connectionLibrary,library,presaleContract ]);
  

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, buyToken, library,
            connectedAccount, network, switchNetwork, chainId, presaleContract, tokenContract, tokenAirdropContract,
            accounts, account, disconnect, truncateAddress, toHex, claim, isLoading,
            totalTokenContributionByUser, totalWeiContributionByUser
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
