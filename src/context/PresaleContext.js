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
    testNetAirdropAddress ,
    ajiraPayMainnetFinalPresaleAddress,
    ajiraPayMainnetFinalAddress,
    ajiraPayAirdropDitributorMainnetAddress,
    ajiraPayPresaleLatestMainnetAddress
  } 
  from '../artifacts/contract_addresses';

import { Audio, Oval, ColorRing } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//Latest Mainnet Presale Contract = https://bscscan.com/address/0x4A7c5A4EfB90D3CBD1C3c25b775b822EBA600081#readContract
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

//LOAD FINAL DEPLOYED CONTRACTS
const ajiraPayPresaleFinalMainnetContractABI = require('../artifacts/abis/presaleFinalMainnetABI.json');
const ajiraPayTokenFinalMainnetContractABI = require('../artifacts/abis/ajirapayFinanceFinalMainnetABI.json');
const ajiraPayAirdropFinalMainnetContractABI = require('../artifacts/abis/airdropFinalMainnetABI.json');
const latestAjiraPayFinancePresaleMainnetContractABI = require('../artifacts/abis/latestAjiraPayPresaleABI.json');

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
    const [totalTokensClaimedByUser, settotalTokenContributionsClaimedByUser] = useState()
    const [presalePhase1Price, setPresalePhase1Price] = useState()
    const [presalePhase2Price, setPresalePhase2Price] = useState()
    const [presalePhase3Price, setPresalePhase3Price] = useState()
    const [phase1TotalTokensBought, setPhase1TotalTokensBought] = useState()
    const [phase2TotalTokensBought, setPhase2TotalTokensBought] = useState()
    const [phase3TotalTokensBought, setPhase3TotalTokensBought] = useState()
    const [totalWeiRaised, setTotalWeiRaised] = useState()
    const [totalContributors, setTotalContributors] = useState()
    const [tokenSaleDuration, setTokenSaleDuration] = useState()
    const [isPresaleOpenForClaims,setIsPresaleOpenForClaims]  = useState()
    const [isPresaleStarted,setIsPresaleStarted]  = useState()
    const [isPresalePaused,setIsPresalePaused]  = useState()
    const [isActiveInvestor, setIsActiveInvestor] = useState()

    const [phase1TotalTokensToSell, setPhase1TotalTokensToSell] = useState()
    const [phase2TotalTokensToSell, setPhase2TotalTokensToSell] = useState()
    const [phase3TotalTokensToSell, setPhase3TotalTokensToSell] = useState()
    const [isPhase1Active, setIsPhase1Active] = useState()
    const [isPhase2Active, setIsPhase2Active] = useState()
    const [isPhase3Active, setIsPhase3Active] = useState()
    const [percentageSoldPhase1, setPercentageSoldPhase1] = useState(0)
    const [percentageSoldPhase2, setPercentageSoldPhase2] = useState(0)
    const [percentageSoldPhase3, setPercentageSoldPhase3] = useState(0)
    const [totalTokensBoughtByUserInPhase1, settotalTokenContributionsBoughtByUserInPhase1] = useState()
    const [totalTokensBoughtByUserInPhase2, settotalTokenContributionsBoughtByUserInPhase2] = useState()
    const [totalTokensBoughtByUserInPhase3, settotalTokenContributionsBoughtByUserInPhase3] = useState()
    const [totalBNBSpentByInvestorInPhase1, setTotalBNBSpentByUserInPhase1] = useState()
    const [totalBNBSpentByInvestorInPhase2, setTotalBNBSpentByUserInPhase2] = useState()
    const [totalBNBSpentByInvestorInPhase3, setTotalBNBSpentByUserInPhase3] = useState()

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
        //console.log(account)
      }
      //await console.log(network_connection)
     // console.log(await network_connection.chainId)
      // if(chainId !== toHex(56)){
      //   alert('Please switch network to Binance Smart Chain')
      //   throw new Error("Connected to wrong chain, please switch to Binance Smart Chain, mainnet");
      // }
      // console.log({
      //   provider,
      //   signer
      // })
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
              const _tokenContract = new ethers.Contract(ajiraPayMainnetFinalAddress, ajiraPayTokenFinalMainnetContractABI, signer);
              const _presaleContract = new ethers.Contract(ajiraPayMainnetFinalPresaleAddress, ajiraPayPresaleFinalMainnetContractABI, signer);
              const _latestPresaleContract = new ethers.Contract(ajiraPayPresaleLatestMainnetAddress, latestAjiraPayFinancePresaleMainnetContractABI, signer);
              const _airdropContract = new ethers.Contract(ajiraPayAirdropDitributorMainnetAddress, ajiraPayAirdropFinalMainnetContractABI, signer);
              setPresaleContract(_latestPresaleContract)
              //setPresaleContract(_presaleContract)
              setTokenContract(_tokenContract)
              setTokenAirdropContract(_airdropContract)
              
              //LOAD CONTRACT DATA
              const tokenSaleDuration = await _latestPresaleContract.presaleDurationInSec();
              setTokenSaleDuration(parseInt(tokenSaleDuration))
          
              const _isActiveInvestor = await _latestPresaleContract.isActiveInvestor(accounts[0]);
              setIsActiveInvestor(_isActiveInvestor)
            
              const isOpenForClaims = await _latestPresaleContract.isOpenForClaims()
              setIsPresaleOpenForClaims(isOpenForClaims)
    
              const isPresaleStarted = await _latestPresaleContract.isPresaleOpen()
              setIsPresaleStarted(isPresaleStarted)
              
              const isPresalePaused = await _latestPresaleContract.isPresalePaused()
              setIsPresalePaused(isPresalePaused)

              const presalePhase1Active = await _latestPresaleContract.isPhase1Active()
              setIsPhase1Active(presalePhase1Active)

              const presalePhase2Active = await _latestPresaleContract.isPhase2Active()
              setIsPhase2Active(presalePhase2Active)

              const presalePhase3Active = await _latestPresaleContract.isPhase3Active()
              setIsPhase3Active(presalePhase3Active)

              //alert(tokenSaleDuration)
              const tokenAmount = await _latestPresaleContract.totalTokenContributionsByUser(accounts[0])
              const tokenValue = ethers.utils.formatEther(tokenAmount)
              setTotalTokenContributionByUser(tokenValue)

              const _totalTokensClaimedByUser = await _latestPresaleContract.totalTokenContributionsClaimedByUser(accounts[0])
              const _totalTokensClaimedByUserVal = ethers.utils.formatEther(_totalTokensClaimedByUser)
              settotalTokenContributionsClaimedByUser(_totalTokensClaimedByUserVal)

              const _totalTokensBoughtByUserInPhase1 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase1(accounts[0])
              const _totalTokensByUserInPhase1Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1)
              settotalTokenContributionsBoughtByUserInPhase1(_totalTokensByUserInPhase1Val)

              const _totalTokensBoughtByUserInPhase2 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase2(accounts[0])
              const _totalTokensByUserInPhase2Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2)
              settotalTokenContributionsBoughtByUserInPhase2(_totalTokensByUserInPhase2Val)

              const _totalTokensBoughtByUserInPhase3 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase3(accounts[0])
              const _totalTokensByUserInPhase3Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3)
              settotalTokenContributionsBoughtByUserInPhase3(_totalTokensByUserInPhase3Val)

              const _totalBNBSpentUserInPhase1 = await _latestPresaleContract.totalPersonalWeiInvestmentPhase1(accounts[0])
              const _totalBNBSpentUserInPhase1Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase1)
              setTotalBNBSpentByUserInPhase1(_totalBNBSpentUserInPhase1Val)

              const _totalBNBSpentUserInPhase2 = await _latestPresaleContract.totalPersonalWeiInvestmentPhase2(accounts[0])
              const _totalBNBSpentUserInPhase2Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase2)
              setTotalBNBSpentByUserInPhase2(_totalBNBSpentUserInPhase2Val)

              const _totalBNBSpentUserInPhase3 = await _latestPresaleContract.totalPersonalWeiInvestmentPhase3(accounts[0])
              const _totalBNBSpentUserInPhase3Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase3)
              setTotalBNBSpentByUserInPhase3(_totalBNBSpentUserInPhase3Val)

              const bnbAmount = await _latestPresaleContract.totalBNBInvestmentsByIUser(accounts[0])
              const bnbValue = ethers.utils.formatEther(bnbAmount)
              setTotalWeiContributionByUser(bnbValue)

              const _totalPresaleContributors = await _latestPresaleContract.totalInvestors()
              setTotalContributors(parseInt(_totalPresaleContributors))
              
              const _totalTokensToSellInPhase1 = await _latestPresaleContract.phase1TotalTokensToSell();
              const _totalTokensToSellInPhase1Val = ethers.utils.formatEther(_totalTokensToSellInPhase1)
              setPhase1TotalTokensToSell(_totalTokensToSellInPhase1Val)

              const _totalTokensToSellInPhase2 = await _latestPresaleContract.phase2TotalTokensToSell();
              const _totalTokensToSellInPhase2Val = ethers.utils.formatEther(_totalTokensToSellInPhase2)
              setPhase2TotalTokensToSell(_totalTokensToSellInPhase2Val)

              const _totalTokensToSellInPhase3 = await _latestPresaleContract.phase3TotalTokensToSell();
              const _totalTokensToSellInPhase3Val = ethers.utils.formatEther(_totalTokensToSellInPhase3)
              setPhase3TotalTokensToSell(_totalTokensToSellInPhase3Val)

              const totalWeiRaised = await _latestPresaleContract.totalWeiRaised()
              const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
              setTotalWeiRaised(totalWeiRaisedVal)

              const phase1PricePerToken = await _latestPresaleContract.phase1PricePerTokenInWei()
              const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
              setPresalePhase1Price(phase1PricePerTokenVal)

              const phase2PricePerToken = await _latestPresaleContract.phase2PricePerTokenInWei()
              const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
              setPresalePhase2Price(phase2PricePerTokenVal)
              
              const phase3PricePerToken = await _latestPresaleContract.phase3PricePerTokenInWei()
              const phase3PricePerTokenVal = ethers.utils.formatEther(phase3PricePerToken)
              setPresalePhase3Price(phase3PricePerTokenVal)

              const _phase1TokensSold = await _latestPresaleContract.totalTokensSoldInPhase1()
              const _phase1TokensSoldVal = ethers.utils.formatEther(_phase1TokensSold)
              setPhase1TotalTokensBought(parseInt(_phase1TokensSoldVal))

              const _phase2TokensSold = await _latestPresaleContract.totalTokensSoldInPhase2()
              const _phase2TokensSoldVal = ethers.utils.formatEther(_phase2TokensSold)
              setPhase2TotalTokensBought(parseInt(_phase2TokensSoldVal))

              const _phase3TokensSold = await _latestPresaleContract.totalTokensSoldInPhase3()
              const _phase3TokensSoldVal = ethers.utils.formatEther(_phase3TokensSold)
              setPhase3TotalTokensBought(parseInt(_phase3TokensSoldVal))
              //(Math.round(num * 100) / 100).toFixed(2);
              const testPercentage = Math.round(90 * 100 / 100).toFixed(2)
              const phase1PercentVal = _phase1TokensSoldVal / _totalTokensToSellInPhase1Val * 100;
              const phase1SoldPercentage = Math.round(phase1PercentVal * 100 / 100).toFixed(2)
              const phase2SoldPercentage = Math.round((parseInt(_phase2TokensSoldVal) / parseInt(_totalTokensToSellInPhase2Val) * 100) / 100).toFixed(2)
              const phase3SoldPercentage = Math.round((parseInt(_phase3TokensSoldVal) / parseInt(_totalTokensToSellInPhase3Val) * 100) / 100).toFixed(2)
              //setPercentageSoldPhase1(testPercentage)
              setPercentageSoldPhase1(phase1SoldPercentage)
              setPercentageSoldPhase2(phase2SoldPercentage)
              setPercentageSoldPhase3(phase3SoldPercentage)
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
        const txHash = await presaleContractInstance.contribute({value: amount, gasLimit: 600000}); //gasLimit: 300000
        await txHash.wait()
        const errorData = Object.entries(txHash);
        let data = errorData.map( ([key, val]) => {
          return `${val}`
        });
        //console.log(data[0])
        
        var htmlContent = document.createElement("button");
        var link = `<a href='https://bscscan.com/tx/${data[0]}' target='__blank'>View On Explorer</a>`
        htmlContent.innerHTML = link
        swal({
          icon: "success",
          success: true,
          button: {
            confirm: true,
          },
          title: 'Purchase Request Submitted Successfully!',
          dangerMode: false,
          //text: `View Progress on Explorer: ${data[0]}`,
          content: htmlContent,
        
        })
        refreshAccountContributionData(connectedAccount)
      }catch(error){
        const errorData = Object.entries(error);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          
          swal({
            icon: "danger",
            success: false,
            button: {
              confirm: true,
            },
            title: 'Error: ',
            dangerMode: true,
            text: `${data[0]}`
          })
        setError(error);
        console.log(error);
      }
    }
    
    const claim = async() => {
      try{
        const presaleContractInstance = presaleContract
        var htmlContent = document.createElement("button");
        
        const tx = await presaleContractInstance.claimContribution({gasLimit: 300000})
        await tx.wait()
        const errorData = Object.entries(tx);
        let data = errorData.map( ([key, val]) => {
            return `${val}`
        });
        
        var link = `<a href='https://bscscan.com/tx/${data[0]}' target='__blank'>View On Explorer</a>`
        htmlContent.innerHTML = link

        swal({
          icon: "success",
          success: true,
          button: {
            confirm: true,
          },
          title: 'Success!',
          dangerMode: false,
          //text: `View Progress on Explorer: ${data[0]}`,
          content: htmlContent
        })

        refreshAccountContributionData(connectedAccount)
        //const tx = await presaleContractInstance.claimContribution().then(async (response) => {
      }catch(error){
        const errorData = Object.entries(error);
        let data = errorData.map( ([key, val]) => {
            return `${val}`
        });
        swal({
          icon: "danger",
          success: false,
          button: {
            confirm: true,
          },
          title: 'Error Sending Transaction!',
          dangerMode: true,
          //text: `View Progress on Explorer: ${data[0]}`,
          text: `${data[0]}`
        })
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
          connectWallet();
          //setConnected(true);
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
        try{
          const presaleContractInstance = presaleContract
          
              //LOAD CONTRACT DATA
              const tokenSaleDuration = await presaleContractInstance.presaleDurationInSec();
              setTokenSaleDuration(parseInt(tokenSaleDuration))
          
              const _isActiveInvestor = await presaleContractInstance.isActiveInvestor(account);
              setIsActiveInvestor(_isActiveInvestor)
            
              const isOpenForClaims = await presaleContractInstance.isOpenForClaims()
              setIsPresaleOpenForClaims(isOpenForClaims)
    
              const isPresaleStarted = await presaleContractInstance.isPresaleOpen()
              setIsPresaleStarted(isPresaleStarted)
              
              const isPresalePaused = await presaleContractInstance.isPresalePaused()
              setIsPresalePaused(isPresalePaused)

              const presalePhase1Active = await presaleContractInstance.isPhase1Active()
              setIsPhase1Active(presalePhase1Active)

              const presalePhase2Active = await presaleContractInstance.isPhase2Active()
              setIsPhase2Active(presalePhase2Active)

              const presalePhase3Active = await presaleContractInstance.isPhase3Active()
              setIsPhase3Active(presalePhase3Active)

              //alert(tokenSaleDuration)
              const tokenAmount = await presaleContractInstance.totalTokenContributionsByUser(account)
              const tokenValue = ethers.utils.formatEther(tokenAmount)
              setTotalTokenContributionByUser(tokenValue)

              const _totalTokensClaimedByUser = await presaleContractInstance.totalTokenContributionsClaimedByUser(account)
              const _totalTokensClaimedByUserVal = ethers.utils.formatEther(_totalTokensClaimedByUser)
              settotalTokenContributionsClaimedByUser(_totalTokensClaimedByUserVal)

              const _totalTokensBoughtByUserInPhase1 = await presaleContractInstance.totalPersonalTokenInvestmentPhase1(account)
              const _totalTokensByUserInPhase1Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1)
              settotalTokenContributionsBoughtByUserInPhase1(_totalTokensByUserInPhase1Val)

              const _totalTokensBoughtByUserInPhase2 = await presaleContractInstance.totalPersonalTokenInvestmentPhase2(account)
              const _totalTokensByUserInPhase2Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2)
              settotalTokenContributionsBoughtByUserInPhase2(_totalTokensByUserInPhase2Val)

              const _totalTokensBoughtByUserInPhase3 = await presaleContractInstance.totalPersonalTokenInvestmentPhase3(account)
              const _totalTokensByUserInPhase3Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3)
              settotalTokenContributionsBoughtByUserInPhase3(_totalTokensByUserInPhase3Val)

              const _totalBNBSpentUserInPhase1 = await presaleContractInstance.totalPersonalWeiInvestmentPhase1(account)
              const _totalBNBSpentUserInPhase1Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase1)
              setTotalBNBSpentByUserInPhase1(_totalBNBSpentUserInPhase1Val)

              const _totalBNBSpentUserInPhase2 = await presaleContractInstance.totalPersonalWeiInvestmentPhase2(account)
              const _totalBNBSpentUserInPhase2Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase2)
              setTotalBNBSpentByUserInPhase2(_totalBNBSpentUserInPhase2Val)

              const _totalBNBSpentUserInPhase3 = await presaleContractInstance.totalPersonalWeiInvestmentPhase3(account)
              const _totalBNBSpentUserInPhase3Val = ethers.utils.formatEther(_totalBNBSpentUserInPhase3)
              setTotalBNBSpentByUserInPhase3(_totalBNBSpentUserInPhase3Val)

              const bnbAmount = await presaleContractInstance.totalBNBInvestmentsByIUser(account)
              const bnbValue = ethers.utils.formatEther(bnbAmount)
              setTotalWeiContributionByUser(bnbValue)

              const _totalPresaleContributors = await presaleContractInstance.totalInvestors()
              setTotalContributors(parseInt(_totalPresaleContributors))
              
              const _totalTokensToSellInPhase1 = await presaleContractInstance.phase1TotalTokensToSell();
              const _totalTokensToSellInPhase1Val = ethers.utils.formatEther(_totalTokensToSellInPhase1)
              setPhase1TotalTokensToSell(_totalTokensToSellInPhase1Val)

              const _totalTokensToSellInPhase2 = await presaleContractInstance.phase2TotalTokensToSell();
              const _totalTokensToSellInPhase2Val = ethers.utils.formatEther(_totalTokensToSellInPhase2)
              setPhase2TotalTokensToSell(_totalTokensToSellInPhase2Val)

              const _totalTokensToSellInPhase3 = await presaleContractInstance.phase3TotalTokensToSell();
              const _totalTokensToSellInPhase3Val = ethers.utils.formatEther(_totalTokensToSellInPhase3)
              setPhase3TotalTokensToSell(_totalTokensToSellInPhase3Val)

              const totalWeiRaised = await presaleContractInstance.totalWeiRaised()
              const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
              setTotalWeiRaised(totalWeiRaisedVal)

              const phase1PricePerToken = await presaleContractInstance.phase1PricePerTokenInWei()
              const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
              setPresalePhase1Price(phase1PricePerTokenVal)

              const phase2PricePerToken = await presaleContractInstance.phase2PricePerTokenInWei()
              const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
              setPresalePhase2Price(phase2PricePerTokenVal)
              
              const phase3PricePerToken = await presaleContractInstance.phase3PricePerTokenInWei()
              const phase3PricePerTokenVal = ethers.utils.formatEther(phase3PricePerToken)
              setPresalePhase3Price(phase3PricePerTokenVal)

              const _phase1TokensSold = await presaleContractInstance.totalTokensSoldInPhase1()
              const _phase1TokensSoldVal = ethers.utils.formatEther(_phase1TokensSold)
              setPhase1TotalTokensBought(parseInt(_phase1TokensSoldVal))

              const _phase2TokensSold = await presaleContractInstance.totalTokensSoldInPhase2()
              const _phase2TokensSoldVal = ethers.utils.formatEther(_phase2TokensSold)
              setPhase2TotalTokensBought(parseInt(_phase2TokensSoldVal))

              const _phase3TokensSold = await presaleContractInstance.totalTokensSoldInPhase3()
              const _phase3TokensSoldVal = ethers.utils.formatEther(_phase3TokensSold)
              setPhase3TotalTokensBought(parseInt(_phase3TokensSoldVal))
              //(Math.round(num * 100) / 100).toFixed(2);
              const testPercentage = Math.round(90 * 100 / 100).toFixed(2)
              const phase1PercentVal = _phase1TokensSoldVal / _totalTokensToSellInPhase1Val * 100;
              const phase1SoldPercentage = Math.round(phase1PercentVal * 100 / 100).toFixed(2)
              const phase2SoldPercentage = Math.round((parseInt(_phase2TokensSoldVal) / parseInt(_totalTokensToSellInPhase2Val) * 100) / 100).toFixed(2)
              const phase3SoldPercentage = Math.round((parseInt(_phase3TokensSoldVal) / parseInt(_totalTokensToSellInPhase3Val) * 100) / 100).toFixed(2)
              //setPercentageSoldPhase1(testPercentage)
              setPercentageSoldPhase1(phase1SoldPercentage)
              setPercentageSoldPhase2(phase2SoldPercentage)
              setPercentageSoldPhase3(phase3SoldPercentage)
    
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
            //setConnected(true);
            //console.log(chain)
            //localStorage.setItem('isWalletConnected',true) 
            window.location.reload()
            //localStorage?.getItem('isWalletConnected') === 'true'
            //await getSignerOrProvider()
          }catch{
            console.log(error)
          }
        };

        const handleDisconnect = () => {
          //console.log("disconnected");
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
    }, [connectionLibrary,library,presaleContract,localStorage,chainId]);
  

    return (
        <PresaleContext.Provider value={{
            isConnected, provider, connectWallet, disconnectWallet, buyToken, library,
            connectedAccount, network, switchNetwork, chainId, presaleContract, tokenContract, tokenAirdropContract,
            accounts, account, disconnect, truncateAddress, toHex, claim, isLoading,
            totalTokenContributionByUser, totalWeiContributionByUser,totalTokensClaimedByUser, totalWeiRaised, totalContributors,
            presalePhase1Price, presalePhase2Price,tokenSaleDuration, phase1TotalTokensBought, phase2TotalTokensBought,
            isPresaleOpenForClaims,isPresaleStarted,isPresalePaused,isActiveInvestor, phase3TotalTokensBought, 
            phase1TotalTokensToSell, phase2TotalTokensToSell, phase3TotalTokensToSell, isPhase1Active, isPhase2Active, isPhase3Active,
            percentageSoldPhase1, percentageSoldPhase2, percentageSoldPhase3, 
            totalTokensBoughtByUserInPhase1, totalTokensBoughtByUserInPhase2,totalTokensBoughtByUserInPhase3,
            totalBNBSpentByInvestorInPhase1, totalBNBSpentByInvestorInPhase2, totalBNBSpentByInvestorInPhase3
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
