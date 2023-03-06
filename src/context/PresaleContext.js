/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ethers } from 'ethers';
import CoinbaseWalletSDK   from "@coinbase/wallet-sdk";
import WalletConnect    from "@walletconnect/web3-provider";
import Web3Modal  from "web3modal";
import swal from 'sweetalert';

import 
{ 
    ajiraPayMainnetFinalPresaleAddress,
    ajiraPayMainnetFinalAddress,
    ajiraPayAirdropDitributorMainnetAddress,
    ajiraPayPresaleLatestMainnetAddress,
    ajiraPayFinanceFinalStableCoinContractAddress,
    USDT_ADDRESS, 
    BUSD_ADDRESS,
    USDC_ADDRESS,
    DAI_ADDRESS
  } 
  from '../artifacts/contract_addresses';

import { Audio, Oval, ColorRing } from  'react-loader-spinner'
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//Latest Mainnet Presale Contract = https://bscscan.com/address/0x4A7c5A4EfB90D3CBD1C3c25b775b822EBA600081#readContract
//Testnet AJP Contract: https://testnet.bscscan.com/address/0x82F25F3BDF94Bf9b67853C1CcE074Fd58B90416a#code
//Testnet Presale Contract: https://testnet.bscscan.com/address/0xCb3972A14B6534aC27bb173928C4855Cb1ED7bA9#code
//Testnet Airdrop Distributor Contract: https://testnet.bscscan.com/address/0xAEc7DAFBDF10c14F9705BAB9eb8753d7544877DF#code


export const PresaleContext = React.createContext();

//LOAD FINAL DEPLOYED CONTRACTS
const ajiraPayPresaleFinalMainnetContractABI = require('../artifacts/abis/presaleFinalMainnetABI.json');
const ajiraPayTokenFinalMainnetContractABI = require('../artifacts/abis/ajirapayFinanceFinalMainnetABI.json');
const ajiraPayAirdropFinalMainnetContractABI = require('../artifacts/abis/airdropFinalMainnetABI.json');
const latestAjiraPayFinancePresaleMainnetContractABI = require('../artifacts/abis/latestAjiraPayPresaleABI.json');
const ajiraPayFinanceStablecoinPresaleContractABI = require('../artifacts/abis/ajiraPayFinanceStableCoinPresaleABI.json')

const usdtContractABI = require('../artifacts/abis/usdt_contract_abi.json');
const busdContractABI = require('../artifacts/abis/busd_contract_abi.json');
const usdcContractABI = require('../artifacts/abis/usdc_contract_abi.json');
const daiContractABI = require('../artifacts/abis/dai_contract_abi.json');

const showLoader = async() =>{
  return(
    <>
       <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />

    </>
  )
 
}

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
    const [stableCoinContract, setStableCoinPresaleContract] = useState()
    const [usdtContractInstance, setUsdtContract] = useState()
    const [busdContractInstance, setBusdContract] = useState()
    const [usdctContractInstance, setUsdcContract] = useState()
    const [daiContractInstance, setDaiContract] = useState()
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
    const [totalContributors, setTotalContributors] = useState(0)
    const [tokenSaleDuration, setTokenSaleDuration] = useState()
    const [isPresaleOpenForClaims,setIsPresaleOpenForClaims]  = useState()

    const [isPresaleStarted,setIsPresaleStarted]  = useState()
    const [isPresalePaused,setIsPresalePaused]  = useState()
    const [isActiveInvestor, setIsActiveInvestor] = useState()

    const [phase1TotalTokensToSell, setPhase1TotalTokensToSell] = useState(0)
    const [phase2TotalTokensToSell, setPhase2TotalTokensToSell] = useState(0)
    const [phase3TotalTokensToSell, setPhase3TotalTokensToSell] = useState(0)

    const [isPhase1Active, setIsPhase1Active] = useState()
    const [isPhase2Active, setIsPhase2Active] = useState()
    const [isPhase3Active, setIsPhase3Active] = useState()

    const [percentageSoldPhase1, setPercentageSoldPhase1] = useState(0)
    const [percentageSoldPhase2, setPercentageSoldPhase2] = useState(0)
    const [percentageSoldPhase3, setPercentageSoldPhase3] = useState(0)

    const [totalTokensBoughtByUserInPhase1, settotalTokenContributionsBoughtByUserInPhase1] = useState(0)
    const [totalTokensBoughtByUserInPhase2, settotalTokenContributionsBoughtByUserInPhase2] = useState(0)
    const [totalTokensBoughtByUserInPhase3, settotalTokenContributionsBoughtByUserInPhase3] = useState(0)

    const [totalBNBSpentByInvestorInPhase1, setTotalBNBSpentByUserInPhase1] = useState(0)
    const [totalBNBSpentByInvestorInPhase2, setTotalBNBSpentByUserInPhase2] = useState(0)
    const [totalBNBSpentByInvestorInPhase3, setTotalBNBSpentByUserInPhase3] = useState(0)

    //Stablecoin presale blockchain state
    const [phase1TotalTokensBoughtInStableCoin, setPhase1TotalTokensBoughtInStableCoin] = useState(0)
    const [phase2TotalTokensBoughtInStableCoin, setPhase2TotalTokensBoughtInStableCoin] = useState(0)
    const [phase3TotalTokensBoughtInStableCoin, setPhase3TotalTokensBoughtInStableCoin] = useState(0)

    const [isPhase1ActiveInStablecoin, setIsPhase1ActiveInStablecoin] = useState()
    const [isPhase2ActiveInStablecoin, setIsPhase2ActiveInStablecoin] = useState()
    const [isPhase3ActiveInStablecoin, setIsPhase3ActiveInStablecoin] = useState()

    const [phase1TotalTokensToSellInStableCoin, setPhase1TotalTokensToSellInStableCoin] = useState(0)
    const [phase2TotalTokensToSellInStableCoin, setPhase2TotalTokensToSellInStableCoin] = useState(0)
    const [phase3TotalTokensToSellInStableCoin, setPhase3TotalTokensToSellInStableCoin] = useState(0)

    const [percentageSoldPhase1FrommStableCoin,setPercentageSoldPhase1FrommStableCoin] = useState(0)
    const [percentageSoldPhase2FrommStableCoin,setPercentageSoldPhase2FrommStableCoin] = useState(0)
    const [percentageSoldPhase3FrommStableCoin,setPercentageSoldPhase3FrommStableCoin] = useState(0)

    //AGGREGATED DATA(FROM STABLECOIN AND BNB Presale Contributions)
    const [overalPercentageSoldPhase1, setOveralPercentageSoldPhase1] = useState(0)
    const [overalPercentageSoldPhase2, setOveralPercentageSoldPhase2] = useState(0)
    const [overalPercentageSoldPhase3, setOveralPercentageSoldPhase3] = useState(0)

    //Stable coin user balances
    const [userUSDTBalance, setUserUSDTBalance] = useState(0)
    const [userBUSDBalance, setUserBUSDBalance] = useState(0)
    const [userUSDCBalance, setUserUSDCBalance] = useState(0)
    const [userDAIBalance, setUserDAIBalance] = useState(0)

    const [isApprovalComplete, setApprovalComplete] = useState(false)
    const [isPurchaseComplete, setIsPurchaseComplete] = useState(false)

    const [canShowProgressBar, setCanShowProgressBar] = useState(false)

    const [totalTokensBoughtInPhase1InBothContracts, setTotalTokensBoughtInPhase1InBothContracts] = useState(0)
    const [totalTokensBoughtInPhase2InBothContracts, setTotalTokensBoughtInPhase2InBothContracts] = useState(0)
    const [totalTokensBoughtInPhase3InBothContracts, setTotalTokensBoughtInPhase3InBothContracts] = useState(0)

    const [totalTokenContributionsClaimedByUserFromStableCoin,settotalTokenContributionsClaimedByUserFromStableCoin] = useState(0)
    const [totalTokenContributionByUserFromStableCoin, setTotalTokenContributionByUserFromStableCoin] = useState(0)
    const [totalTokenContributionsBoughtByUserInPhase1FromStableCoin, settotalTokenContributionsBoughtByUserInPhase1FromStableCoin] = useState(0)

    const [totalTokenContributionAggredated,setTotalTokenContributionAggredated] = useState(0)
    const [totalTokenContributionsBoughtByUserInPhase3FromStableCoin, settotalTokenContributionsBoughtByUserInPhase3FromStableCoin] = useState(0)
    const [totalTokenContributionsBoughtByUserInPhase2FromStableCoin, settotalTokenContributionsBoughtByUserInPhase2FromStableCoin] = useState(0)
    const [totalTokensBoughtByInvestorInPhase1Aggregated, setTotalTokensBoughtByInvestorInPhase1Aggregated] = useState(0)
    const [totalTokensBoughtByInvestorInPhase2Aggregated, setTotalTokensBoughtByInvestorInPhase2Aggregated] = useState(0)
    const [totalTokensBoughtByInvestorInPhase3Aggregated, setTotalTokensBoughtByInvestorInPhase3Aggregated] = useState(0)

    const [totalUsdRaised, setTotalUsdRaised] = useState(0)

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
      }
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
          package: WalletConnect,
          options: {
            infuraId: '4420f3851225491b923a06948965929a',
          }
        }
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

    const loadBlockchainData = async() => {
      const provider_url = 'https://bsc-dataseed.binance.org/'

      const loadedProvider = new ethers.providers.JsonRpcProvider(provider_url);
      const signer_ = loadedProvider.getSigner();

      const presaleContract = new ethers.Contract(ajiraPayPresaleLatestMainnetAddress,latestAjiraPayFinancePresaleMainnetContractABI,loadedProvider);
      const stableCoinPresaleContract = new ethers.Contract(ajiraPayFinanceFinalStableCoinContractAddress,ajiraPayFinanceStablecoinPresaleContractABI,loadedProvider);

      const totaContributors = await presaleContract.totalInvestors();
      const totaContributorsFromStableCoin = await stableCoinPresaleContract.totalInvestors();
      const totalInvestors = parseInt(totaContributors) + parseInt(totaContributorsFromStableCoin);
      setTotalContributors(parseInt(totalInvestors))

      const totalWeiRaised = await presaleContract.totalWeiRaised()
      const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
      setTotalWeiRaised(totalWeiRaisedVal)

      const totalUsdRaisedFromStableCoinPurchase = await stableCoinPresaleContract.totalUsdRaised();
      const totalUsdRaisedFromStableCoinPurchaseVal = ethers.utils.formatEther(totalUsdRaisedFromStableCoinPurchase)
      setTotalUsdRaised(parseInt(totalUsdRaisedFromStableCoinPurchaseVal))

      const presalePhase1Active = await presaleContract.isPhase1Active()
      const presalePhase1ActiveFromStableCoin = await stableCoinPresaleContract.isPhase1Active()
      setIsPhase1Active(presalePhase1Active)
      setIsPhase1ActiveInStablecoin(presalePhase1ActiveFromStableCoin)

      const presalePhase2Active = await presaleContract.isPhase2Active()
      const presalePhase2ActiveFromStableCoin = await stableCoinPresaleContract.isPhase2Active()
      setIsPhase2Active(presalePhase2Active)
      setIsPhase2ActiveInStablecoin(presalePhase2ActiveFromStableCoin)

      const presalePhase3Active = await presaleContract.isPhase3Active()
      const presalePhase3ActiveFromStableCoin = await stableCoinPresaleContract.isPhase3Active()
      setIsPhase3Active(presalePhase3Active)
      setIsPhase3ActiveInStablecoin(presalePhase3ActiveFromStableCoin)

      const phase1PricePerToken = await presaleContract.phase1PricePerTokenInWei()
      const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
      setPresalePhase1Price(phase1PricePerTokenVal)

      const phase2PricePerToken = await presaleContract.phase2PricePerTokenInWei()
      const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
      setPresalePhase2Price(phase2PricePerTokenVal)
      
      const phase3PricePerToken = await presaleContract.phase3PricePerTokenInWei()
      const phase3PricePerTokenVal = ethers.utils.formatEther(phase3PricePerToken)
      setPresalePhase3Price(phase3PricePerTokenVal)

      const _totalTokensToSellInPhase1 = await presaleContract.phase1TotalTokensToSell();
      const _totalTokensToSellInPhase1Val = ethers.utils.formatEther(_totalTokensToSellInPhase1)
      setPhase1TotalTokensToSell(parseInt(parseInt(_totalTokensToSellInPhase1Val)))

      const _totalTokensToSellInPhase1FromStableCoin = await stableCoinPresaleContract.phase1TotalTokensToSell();
      const _totalTokensToSellInPhase1ValFromStableCoin = ethers.utils.formatEther(_totalTokensToSellInPhase1FromStableCoin)
      setPhase1TotalTokensToSellInStableCoin(parseInt(_totalTokensToSellInPhase1ValFromStableCoin))

      const _totalTokensToSellInPhase2 = await presaleContract.phase2TotalTokensToSell();
      const _totalTokensToSellInPhase2Val = ethers.utils.formatEther(_totalTokensToSellInPhase2)
      setPhase2TotalTokensToSell(parseInt(_totalTokensToSellInPhase2Val))

      const _totalTokensToSellInPhase2FromStableCoin = await stableCoinPresaleContract.phase2TotalTokensToSell();
      const _totalTokensToSellInPhase2ValFromStableCoin = ethers.utils.formatEther(_totalTokensToSellInPhase2FromStableCoin)
      setPhase2TotalTokensToSellInStableCoin(parseInt(_totalTokensToSellInPhase2ValFromStableCoin))

      const _totalTokensToSellInPhase3 = await presaleContract.phase3TotalTokensToSell();
      const _totalTokensToSellInPhase3Val = ethers.utils.formatEther(_totalTokensToSellInPhase3)
      setPhase3TotalTokensToSell(parseInt(_totalTokensToSellInPhase3Val))

      const _totalTokensToSellInPhase3FromStableCoin = await stableCoinPresaleContract.phase3TotalTokensToSell();
      const _totalTokensToSellInPhase3ValFromStableCoin = ethers.utils.formatEther(_totalTokensToSellInPhase3FromStableCoin)
      setPhase3TotalTokensToSellInStableCoin(parseInt(_totalTokensToSellInPhase3ValFromStableCoin))

      const _phase1TokensSold = await presaleContract.totalTokensSoldInPhase1()
      const _phase1TokensSoldVal = ethers.utils.formatEther(_phase1TokensSold)
      setPhase1TotalTokensBought(parseInt(_phase1TokensSoldVal))

      const _phase1TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase1()
      const _phase1TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase1TokensSoldFromStableCoin)
      setPhase1TotalTokensBoughtInStableCoin(parseInt(_phase1TokensSoldValFromStableCoin))
      
      const totalTokensBoughtAtPresaleInPhase1InAllContracts = parseInt(_phase1TokensSoldVal) + parseInt(_phase1TokensSoldValFromStableCoin)
      setTotalTokensBoughtInPhase1InBothContracts(parseInt(totalTokensBoughtAtPresaleInPhase1InAllContracts))

      const _phase2TokensSold = await presaleContract.totalTokensSoldInPhase2()
      const _phase2TokensSoldVal = ethers.utils.formatEther(_phase2TokensSold)
      setPhase2TotalTokensBought(parseInt(_phase2TokensSoldVal))

      const _phase2TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase2()
      const _phase2TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase2TokensSoldFromStableCoin)
      setPhase2TotalTokensBoughtInStableCoin(parseInt(_phase2TokensSoldValFromStableCoin))
    
      const totalTokensBoughtAtPresaleInPhase2InAllContracts = parseInt(_phase2TokensSoldVal) + parseInt(_phase2TokensSoldValFromStableCoin)
      setTotalTokensBoughtInPhase2InBothContracts(parseInt(totalTokensBoughtAtPresaleInPhase2InAllContracts))

      const _phase3TokensSold = await presaleContract.totalTokensSoldInPhase3()
      const _phase3TokensSoldVal = ethers.utils.formatEther(_phase3TokensSold)
      setPhase3TotalTokensBought(parseInt(_phase3TokensSoldVal))

      const _phase3TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase3()
      const _phase3TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase3TokensSoldFromStableCoin)
      setPhase3TotalTokensBoughtInStableCoin(parseInt(_phase3TokensSoldValFromStableCoin))

      const totalTokensBoughtAtPresaleInPhase3InAllContracts = parseInt(_phase3TokensSoldVal) + parseInt(_phase3TokensSoldValFromStableCoin)
      setTotalTokensBoughtInPhase3InBothContracts(parseInt(totalTokensBoughtAtPresaleInPhase3InAllContracts))

      const phase1PercentVal = _phase1TokensSoldVal / _totalTokensToSellInPhase1Val * 100;
      const phase2PercentVal = _phase2TokensSoldVal / _totalTokensToSellInPhase2Val * 100;
      const phase3PercentVal = _phase3TokensSoldVal / _totalTokensToSellInPhase3Val * 100;

      const phase1SoldPercentage = Math.round(phase1PercentVal * 100 / 100).toFixed(2)
      const phase2SoldPercentage = Math.round(phase2PercentVal * 100 / 100).toFixed(2)
      const phase3SoldPercentage = Math.round(phase3PercentVal * 100 / 100).toFixed(2)
      //setPercentageSoldPhase1(testPercentage)
      setPercentageSoldPhase1(phase1SoldPercentage)
      setPercentageSoldPhase2(phase2SoldPercentage)
      setPercentageSoldPhase3(phase3SoldPercentage)

      const phase1PercentValFromStableCoin = _phase1TokensSoldValFromStableCoin / _totalTokensToSellInPhase1ValFromStableCoin * 100;
      const phase2PercentValFromStableCoin = _phase2TokensSoldValFromStableCoin / _totalTokensToSellInPhase2ValFromStableCoin * 100;
      const phase3PercentValFromStableCoin = _phase3TokensSoldValFromStableCoin / _totalTokensToSellInPhase3ValFromStableCoin * 100;

      const phase1SoldPercentageFromStableCoin = Math.round(phase1PercentValFromStableCoin * 100 / 100).toFixed(2)
      const phase2SoldPercentageFromStableCoin = Math.round(phase2PercentValFromStableCoin * 100 / 100).toFixed(2)
      const phase3SoldPercentageFromStableCoin = Math.round(phase3PercentValFromStableCoin * 100 / 100).toFixed(2)

      setPercentageSoldPhase1FrommStableCoin(phase1SoldPercentageFromStableCoin)
      setPercentageSoldPhase2FrommStableCoin(phase2SoldPercentageFromStableCoin)
      setPercentageSoldPhase3FrommStableCoin(phase3SoldPercentageFromStableCoin)
      
      const totalPercentageSoldInPhase1 = phase1SoldPercentage + phase1SoldPercentageFromStableCoin;
      const totalPercentageSoldInPhase2 = phase2SoldPercentage + phase2SoldPercentageFromStableCoin;
      const totalPercentageSoldInPhase3 = phase3SoldPercentage + phase3SoldPercentageFromStableCoin;

      setOveralPercentageSoldPhase1(totalPercentageSoldInPhase1)
      setOveralPercentageSoldPhase2(totalPercentageSoldInPhase2)
      setOveralPercentageSoldPhase3(totalPercentageSoldInPhase3)


      //console.log(parseInt(totaContributors));

      //STABLECOIN PURCHASE FUNCTIONALITY
      
      //console.log(ethers.utils.formatEther(totalStablecoinTokenPurchase));
    }

    const connectWallet = async() =>{
        try {
            const connection = await getSignerOrProvider()
            const provider = connection.provider
            const signer = connection.signer
            const accounts = await provider.listAccounts();
            const network = await provider.getNetwork();
            setProvider(connection.provider)
            setLibrary(connection.provider)

            localStorage.setItem('isWalletConnected', true)
            if (accounts){
              setConnectedAccount(accounts[0])
            } 
            setChainId(network.chainId);
            setAccount(accounts[0]);
            setConnected(true);

           
            if(provider){
              const _tokenContract = new ethers.Contract(ajiraPayMainnetFinalAddress, ajiraPayTokenFinalMainnetContractABI, signer);
              const _presaleContract = new ethers.Contract(ajiraPayMainnetFinalPresaleAddress, ajiraPayPresaleFinalMainnetContractABI, signer);
              const _latestPresaleContract = new ethers.Contract(ajiraPayPresaleLatestMainnetAddress, latestAjiraPayFinancePresaleMainnetContractABI, signer);
              const _airdropContract = new ethers.Contract(ajiraPayAirdropDitributorMainnetAddress, ajiraPayAirdropFinalMainnetContractABI, signer);
              setPresaleContract(_latestPresaleContract)
              const stableCoinPresaleContract = new ethers.Contract(ajiraPayFinanceFinalStableCoinContractAddress,ajiraPayFinanceStablecoinPresaleContractABI,signer);
              setStableCoinPresaleContract(stableCoinPresaleContract)
              const usdtContract = new ethers.Contract(USDT_ADDRESS, usdtContractABI, signer);
              setUsdtContract(usdtContract)
              const busdContractInstance = new ethers.Contract(BUSD_ADDRESS, busdContractABI, signer);
              setBusdContract(busdContractInstance)
              const usdcContractInstance = new ethers.Contract(USDC_ADDRESS, usdcContractABI, signer);
              setUsdcContract(usdcContractInstance)
              const daiContractInstance = new ethers.Contract(DAI_ADDRESS, daiContractABI, signer);
              setDaiContract(daiContractInstance)
              const userUSDTBalance = await usdtContract.balanceOf(accounts[0]);
              const userBUSDBalance = await busdContractInstance.balanceOf(accounts[0]);
              const userUSDCBalance = await usdcContractInstance.balanceOf(accounts[0]);
              const userDAIBalance = await daiContractInstance.balanceOf(accounts[0]);
              setUserUSDTBalance(ethers.utils.formatEther(userUSDTBalance))
              setUserBUSDBalance(ethers.utils.formatEther(userBUSDBalance))
              setUserUSDCBalance(ethers.utils.formatEther(userUSDCBalance))
              setUserDAIBalance(ethers.utils.formatEther(userDAIBalance))
              //console.log("My USDT Balance Is", ethers.utils.formatEther(balance))
              //console.log(await busdContractInstance.name());
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

              const phase1PricePerToken = await _latestPresaleContract.phase1PricePerTokenInWei()
              const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
              setPresalePhase1Price(phase1PricePerTokenVal)

              const phase2PricePerToken = await _latestPresaleContract.phase2PricePerTokenInWei()
              const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
              setPresalePhase2Price(phase2PricePerTokenVal)
              
              const phase3PricePerToken = await _latestPresaleContract.phase3PricePerTokenInWei()
              const phase3PricePerTokenVal = ethers.utils.formatEther(phase3PricePerToken)
              setPresalePhase3Price(phase3PricePerTokenVal)

              const _totalPresaleContributors = await _latestPresaleContract.totalInvestors()
              setTotalContributors(parseInt(_totalPresaleContributors))

              const totaContributorsFromStableCoin = await stableCoinPresaleContract.totalInvestors();
              const totalInvestors = parseInt(_totalPresaleContributors) + parseInt(totaContributorsFromStableCoin);
              setTotalContributors(parseInt(totalInvestors))
              
              //alert(tokenSaleDuration)
              const tokenAmount = await _latestPresaleContract.totalTokenContributionsByUser(accounts[0])
              const tokenValue = ethers.utils.formatEther(tokenAmount)
              setTotalTokenContributionByUser(tokenValue)

              const tokenAmountFromStableCoinPurchase = await stableCoinPresaleContract.personalTotalTokenPurchase(accounts[0])
              const tokenValueFromStableCoin = ethers.utils.formatEther(tokenAmountFromStableCoinPurchase)
              setTotalTokenContributionByUserFromStableCoin(tokenValueFromStableCoin)

              const totalUserContributionFromBothContracts = parseInt(tokenValueFromStableCoin) + parseInt(tokenValue);
              setTotalTokenContributionAggredated(parseInt(totalUserContributionFromBothContracts))

              const _totalTokensClaimedByUser = await _latestPresaleContract.totalTokenContributionsClaimedByUser(accounts[0])
              const _totalTokensClaimedByUserVal = ethers.utils.formatEther(_totalTokensClaimedByUser)
              settotalTokenContributionsClaimedByUser(parseInt(_totalTokensClaimedByUserVal))
              
              const _totalTokensClaimedByUserFromStableCoin = await stableCoinPresaleContract.personalTotalTokenPurchaseClaimed(accounts[0])
              const _totalTokensClaimedByUserValFromStableCoin = ethers.utils.formatEther(_totalTokensClaimedByUserFromStableCoin)
              settotalTokenContributionsClaimedByUserFromStableCoin(parseInt(_totalTokensClaimedByUserValFromStableCoin))

              const _totalTokensBoughtByUserInPhase1 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase1(accounts[0])
              const _totalTokensByUserInPhase1Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1)
              settotalTokenContributionsBoughtByUserInPhase1(parseInt(_totalTokensByUserInPhase1Val))

              const _totalTokensBoughtByUserInPhase1FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(accounts[0], 1)
              const _totalTokensByUserInPhase1ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase1FromStableCoin(parseInt(_totalTokensByUserInPhase1ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase1Aggregated = parseInt(_totalTokensByUserInPhase1Val) + parseInt(_totalTokensByUserInPhase1ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase1Aggregated(parseInt(totalTokensBoughtByInvestorInPhase1Aggregated))

              const _totalTokensBoughtByUserInPhase2 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase2(accounts[0])
              const _totalTokensByUserInPhase2Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2)
              settotalTokenContributionsBoughtByUserInPhase2(parseInt(_totalTokensByUserInPhase2Val))

              const _totalTokensBoughtByUserInPhase2FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(accounts[0], 2)
              const _totalTokensByUserInPhase2ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase2FromStableCoin(parseInt(_totalTokensByUserInPhase2ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase2Aggregated = parseInt(_totalTokensByUserInPhase2Val) + parseInt(_totalTokensByUserInPhase2ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase2Aggregated(totalTokensBoughtByInvestorInPhase2Aggregated)

              const _totalTokensBoughtByUserInPhase3 = await _latestPresaleContract.totalPersonalTokenInvestmentPhase3(accounts[0])
              const _totalTokensByUserInPhase3Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3)
              settotalTokenContributionsBoughtByUserInPhase3(parseInt(_totalTokensByUserInPhase3Val))

              const _totalTokensBoughtByUserInPhase3FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(accounts[0], 3)
              const _totalTokensByUserInPhase3ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase3FromStableCoin(parseInt(_totalTokensByUserInPhase3ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase3Aggregated = parseInt(_totalTokensByUserInPhase3Val) + parseInt(_totalTokensByUserInPhase3ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase3Aggregated(totalTokensBoughtByInvestorInPhase3Aggregated)

              const _totalTokensToSellInPhase1 = await _latestPresaleContract.phase1TotalTokensToSell();
              const _totalTokensToSellInPhase1Val = ethers.utils.formatEther(_totalTokensToSellInPhase1)
              setPhase1TotalTokensToSell(parseInt(_totalTokensToSellInPhase1Val))

              const _totalTokensToSellInPhase2 = await _latestPresaleContract.phase2TotalTokensToSell();
              const _totalTokensToSellInPhase2Val = ethers.utils.formatEther(_totalTokensToSellInPhase2)
              setPhase2TotalTokensToSell(parseInt(_totalTokensToSellInPhase2Val))

              const _totalTokensToSellInPhase3 = await _latestPresaleContract.phase3TotalTokensToSell();
              const _totalTokensToSellInPhase3Val = ethers.utils.formatEther(_totalTokensToSellInPhase3)
              setPhase3TotalTokensToSell(parseInt(_totalTokensToSellInPhase3Val))

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

              const totalWeiRaised = await _latestPresaleContract.totalWeiRaised()
              const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
              setTotalWeiRaised(totalWeiRaisedVal)

              const totalUsdRaised = await stableCoinPresaleContract.totalUsdRaised()
              const totalUsdRaisedVal = ethers.utils.formatEther(totalUsdRaised)
              setTotalUsdRaised(parseInt(totalUsdRaisedVal))

              const _phase1TokensSold = await _latestPresaleContract.totalTokensSoldInPhase1()
              const _phase1TokensSoldVal = ethers.utils.formatEther(_phase1TokensSold)
              setPhase1TotalTokensBought(parseInt(_phase1TokensSoldVal))

              const _phase1TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase1()
              const _phase1TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase1TokensSoldFromStableCoin)
              setPhase1TotalTokensBoughtInStableCoin(parseInt(_phase1TokensSoldValFromStableCoin))

              const _phase2TokensSold = await _latestPresaleContract.totalTokensSoldInPhase2()
              const _phase2TokensSoldVal = ethers.utils.formatEther(_phase2TokensSold)
              setPhase2TotalTokensBought(parseInt(_phase2TokensSoldVal))

              const _phase2TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase2()
              const _phase2TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase2TokensSoldFromStableCoin)
              setPhase2TotalTokensBoughtInStableCoin(parseInt(_phase2TokensSoldValFromStableCoin))

              const _phase3TokensSold = await _latestPresaleContract.totalTokensSoldInPhase3()
              const _phase3TokensSoldVal = ethers.utils.formatEther(_phase3TokensSold)
              setPhase3TotalTokensBought(parseInt(_phase3TokensSoldVal))

              const _phase3TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase3()
              const _phase3TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase3TokensSoldFromStableCoin)
              setPhase3TotalTokensBoughtInStableCoin(parseInt(_phase3TokensSoldValFromStableCoin))
              //(Math.round(num * 100) / 100).toFixed(2);
              const phase1PercentVal = _phase1TokensSoldVal / _totalTokensToSellInPhase1Val * 100;
              const phase2PercentVal = _phase2TokensSoldVal / _totalTokensToSellInPhase2Val * 100;
              const phase3PercentVal = _phase3TokensSoldVal / _totalTokensToSellInPhase3Val * 100;
              const phase1SoldPercentage = Math.round(phase1PercentVal * 100 / 100).toFixed(2)
              const phase2SoldPercentage = Math.round(phase2PercentVal * 100 / 100).toFixed(2)
              const phase3SoldPercentage = Math.round(phase3PercentVal * 100 / 100).toFixed(2)
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
        const txHash = await presaleContractInstance.contribute({value: amount}); //gasLimit: 600000
        await txHash.wait()
        //console.log(txHash)
        const errorData = Object.entries(txHash);
        let data = errorData.map( ([key, val]) => {
          return `${val}`
        });
        //console.log(data[0])
        //await web3.eth.getTransactionReceipt(txHash);
        const hash = await provider.getTransaction(txHash);
        // if(hash){
        //   console.log(hash)
        // }
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
        
        const tx = await presaleContractInstance.claimContribution()
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

    const approveUSDTStableCoin = async(address, amount) =>{
      try{
        const connectedUsdtContractInstance = usdtContractInstance 
        //connectedAccount
        const balance = userUSDTBalance;// connectedUsdtContractInstance.balanceOf(connectedAccount);
        //console.log(balance)
        if(balance < amount ){
          swal({
            icon: "danger",
            success: false,
            button: {
              confirm: true,
            },
            title: 'Error...',
            dangerMode: true,
            text: 'Insufficient USDT Balance!'
          })
        }else{
          const txHash = await connectedUsdtContractInstance.approve(address, amount); //{gasLimit: 600000}
          //showLoader()
          await txHash.wait()
          setCanShowProgressBar(true)
          //console.log(txHash)
          const errorData = Object.entries(txHash);
          let data = errorData.map( ([key, val]) => {
            return `${val}`
          });
          var htmlContent = document.createElement("button");
          var link = `<a href='https://bscscan.com/tx/${data[0]}' target='__blank'>View On Explorer</a>`
          htmlContent.innerHTML = link
          swal({
            icon: "success",
            success: true,
            button: {
              confirm: true,
            },
            title: 'Approval Success!',
            dangerMode: false,
            //text: `View Progress on Explorer: ${data[0]}`,
            content: htmlContent,
          
          })
          //const t = ethers.utils.parseEther(amount)
          executeStableCoinPurchase(USDT_ADDRESS, amount);
          //setCanShowProgressBar(false)
          refreshAccountContributionData(connectedAccount)
          //setCanShowProgressBar(false)
         
          //console.log(data[0])
          //refreshAccountContributionData(connectedAccount)

          // swal({
          //   icon: "success",
          //   success: true,
          //   button: {
          //     confirm: true,
          //   },
          //   title: 'Approval Success!',
          //   dangerMode: false,
          //   //text: `View Progress on Explorer: ${data[0]}`,
          //   content: htmlContent,
          
          // })
         
          
        }

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

    const approveBUSDStableCoin = async(address, amount) =>{
      try{
        const balance = userBUSDBalance;// connectedUsdtContractInstance.balanceOf(connectedAccount);
        //console.log(balance)
        if(balance < amount ){
          swal({
            icon: "danger",
            success: false,
            button: {
              confirm: true,
            },
            title: 'Error...',
            dangerMode: true,
            text: 'Insufficient BUSD Balance!'
          })
        }else{
          const connectedBusdContractInstance = busdContractInstance 
          const txHash = await connectedBusdContractInstance.approve(address, amount); //{gasLimit: 600000}
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
            title: 'Approval Success!',
            dangerMode: false,
            //text: `View Progress on Explorer: ${data[0]}`,
            content: htmlContent,
          
          })
          executeStableCoinPurchase(BUSD_ADDRESS, amount);
          //setCanShowProgressBar(false)
          refreshAccountContributionData(connectedAccount)
        }
        
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

    const approveUSDCStableCoin = async(address, amount) =>{
      try{
        if(userUSDCBalance < amount){
          swal({
            icon: "danger",
            success: false,
            button: {
              confirm: true,
            },
            title: 'Error...',
            dangerMode: true,
            text: 'Insufficient USDC Balance!'
          })
        }else{
          const connectedUSDCContractInstance = usdctContractInstance 
          const txHash = await connectedUSDCContractInstance.approve(address, amount); //{gasLimit: 600000}
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
            title: 'Approval Success!',
            dangerMode: false,
            //text: `View Progress on Explorer: ${data[0]}`,
            content: htmlContent,
          
          })
          executeStableCoinPurchase(USDC_ADDRESS, amount);
          //setCanShowProgressBar(false)
          refreshAccountContributionData(connectedAccount)
        }
          
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

    const approveDAIStableCoin = async(address, amount) =>{
      try{
        if(userDAIBalance < amount){
          swal({
            icon: "danger",
            success: false,
            button: {
              confirm: true,
            },
            title: 'Error...',
            dangerMode: true,
            text: 'Insufficient DAI Balance'
          })
        }else{
          const connectedDAIContractInstance = daiContractInstance 
          const txHash = await connectedDAIContractInstance.approve(address, amount); //{gasLimit: 600000}
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
            title: 'Approval Success!',
            dangerMode: false,
            //text: `View Progress on Explorer: ${data[0]}`,
            content: htmlContent,
          
          })
          executeStableCoinPurchase(DAI_ADDRESS, amount);
          //setCanShowProgressBar(false)
          refreshAccountContributionData(connectedAccount)
          }
        
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

    const executeStableCoinPurchase = async(coinAddress, amount) =>{
      try{
        const txHash = await stableCoinContract.buyWithStableCoin(coinAddress, amount); //gasLimit: 300000
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

    const buyTokenWithStableCoin = async(address, amount)=>{
      const t = ethers.utils.parseEther(amount)
      if (address === USDT_ADDRESS){
        executeStableCoinPurchase(address, t); 
      }else if(address === BUSD_ADDRESS){
        executeStableCoinPurchase(BUSD_ADDRESS, t);
      }else if(address === USDC_ADDRESS){
        executeStableCoinPurchase(USDC_ADDRESS, t);
      }else{
        executeStableCoinPurchase(DAI_ADDRESS, t);
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
          const stableCoinPresaleContract = stableCoinContract
          
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

              const phase1PricePerToken = await presaleContractInstance.phase1PricePerTokenInWei()
              const phase1PricePerTokenVal = ethers.utils.formatEther(phase1PricePerToken)
              setPresalePhase1Price(phase1PricePerTokenVal)

              const phase2PricePerToken = await presaleContractInstance.phase2PricePerTokenInWei()
              const phase2PricePerTokenVal = ethers.utils.formatEther(phase2PricePerToken)
              setPresalePhase2Price(phase2PricePerTokenVal)
              
              const phase3PricePerToken = await presaleContractInstance.phase3PricePerTokenInWei()
              const phase3PricePerTokenVal = ethers.utils.formatEther(phase3PricePerToken)
              setPresalePhase3Price(phase3PricePerTokenVal)
              
              const _totalPresaleContributors = await presaleContractInstance.totalInvestors()
              setTotalContributors(parseInt(_totalPresaleContributors))

              const totaContributorsFromStableCoin = await stableCoinPresaleContract.totalInvestors();
              const totalInvestors = parseInt(_totalPresaleContributors) + parseInt(totaContributorsFromStableCoin);
              setTotalContributors(parseInt(totalInvestors))
              
              //alert(tokenSaleDuration)
              const tokenAmount = await presaleContractInstance.totalTokenContributionsByUser(account)
              const tokenValue = ethers.utils.formatEther(tokenAmount)
              setTotalTokenContributionByUser(tokenValue)

              const tokenAmountFromStableCoinPurchase = await stableCoinPresaleContract.personalTotalTokenPurchase(account)
              const tokenValueFromStableCoin = ethers.utils.formatEther(tokenAmountFromStableCoinPurchase)
              setTotalTokenContributionByUserFromStableCoin(tokenValueFromStableCoin)

              const totalUserContributionFromBothContracts = parseInt(tokenValueFromStableCoin) + parseInt(tokenValue);
              setTotalTokenContributionAggredated(parseInt(totalUserContributionFromBothContracts))

              const _totalTokensClaimedByUser = await presaleContractInstance.totalTokenContributionsClaimedByUser(account)
              const _totalTokensClaimedByUserVal = ethers.utils.formatEther(_totalTokensClaimedByUser)
              settotalTokenContributionsClaimedByUser(parseInt(_totalTokensClaimedByUserVal))
              
              const _totalTokensClaimedByUserFromStableCoin = await stableCoinPresaleContract.personalTotalTokenPurchaseClaimed(account)
              const _totalTokensClaimedByUserValFromStableCoin = ethers.utils.formatEther(_totalTokensClaimedByUserFromStableCoin)
              settotalTokenContributionsClaimedByUserFromStableCoin(parseInt(_totalTokensClaimedByUserValFromStableCoin))

              const _totalTokensBoughtByUserInPhase1 = await presaleContractInstance.totalPersonalTokenInvestmentPhase1(account)
              const _totalTokensByUserInPhase1Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1)
              settotalTokenContributionsBoughtByUserInPhase1(parseInt(_totalTokensByUserInPhase1Val))

              const _totalTokensBoughtByUserInPhase1FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(account, 1)
              const _totalTokensByUserInPhase1ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase1FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase1FromStableCoin(parseInt(_totalTokensByUserInPhase1ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase1Aggregated = parseInt(_totalTokensByUserInPhase1Val) + parseInt(_totalTokensByUserInPhase1ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase1Aggregated(parseInt(totalTokensBoughtByInvestorInPhase1Aggregated))

              const _totalTokensBoughtByUserInPhase2 = await presaleContractInstance.totalPersonalTokenInvestmentPhase2(account)
              const _totalTokensByUserInPhase2Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2)
              settotalTokenContributionsBoughtByUserInPhase2(parseInt(_totalTokensByUserInPhase2Val))

              const _totalTokensBoughtByUserInPhase2FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(account, 2)
              const _totalTokensByUserInPhase2ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase2FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase2FromStableCoin(parseInt(_totalTokensByUserInPhase2ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase2Aggregated = parseInt(_totalTokensByUserInPhase2Val) + parseInt(_totalTokensByUserInPhase2ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase2Aggregated(totalTokensBoughtByInvestorInPhase2Aggregated)

              const _totalTokensBoughtByUserInPhase3 = await presaleContractInstance.totalPersonalTokenInvestmentPhase3(account)
              const _totalTokensByUserInPhase3Val = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3)
              settotalTokenContributionsBoughtByUserInPhase3(parseInt(_totalTokensByUserInPhase3Val))

              const _totalTokensBoughtByUserInPhase3FromStableCoin = await stableCoinPresaleContract.investorTokenPurchaseByPhase(account, 3)
              const _totalTokensByUserInPhase3ValFromStableCoin = ethers.utils.formatEther(_totalTokensBoughtByUserInPhase3FromStableCoin)
              settotalTokenContributionsBoughtByUserInPhase3FromStableCoin(parseInt(_totalTokensByUserInPhase3ValFromStableCoin))

              const totalTokensBoughtByInvestorInPhase3Aggregated = parseInt(_totalTokensByUserInPhase3Val) + parseInt(_totalTokensByUserInPhase3ValFromStableCoin)
              setTotalTokensBoughtByInvestorInPhase3Aggregated(totalTokensBoughtByInvestorInPhase3Aggregated)

              const _totalTokensToSellInPhase1 = await presaleContractInstance.phase1TotalTokensToSell();
              const _totalTokensToSellInPhase1Val = ethers.utils.formatEther(_totalTokensToSellInPhase1)
              setPhase1TotalTokensToSell(_totalTokensToSellInPhase1Val)

              const _totalTokensToSellInPhase2 = await presaleContractInstance.phase2TotalTokensToSell();
              const _totalTokensToSellInPhase2Val = ethers.utils.formatEther(_totalTokensToSellInPhase2)
              setPhase2TotalTokensToSell(_totalTokensToSellInPhase2Val)

              const _totalTokensToSellInPhase3 = await presaleContractInstance.phase3TotalTokensToSell();
              const _totalTokensToSellInPhase3Val = ethers.utils.formatEther(_totalTokensToSellInPhase3)
              setPhase3TotalTokensToSell(_totalTokensToSellInPhase3Val)

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

              const totalWeiRaised = await presaleContractInstance.totalWeiRaised()
              const totalWeiRaisedVal = ethers.utils.formatEther(totalWeiRaised)
              setTotalWeiRaised(totalWeiRaisedVal)

              const totalUsdRaised = await stableCoinPresaleContract.totalUsdRaised()
              const totalUsdRaisedVal = ethers.utils.formatEther(totalUsdRaised)
              setTotalUsdRaised(parseInt(totalUsdRaisedVal))

              const _phase1TokensSold = await presaleContractInstance.totalTokensSoldInPhase1()
              const _phase1TokensSoldVal = ethers.utils.formatEther(_phase1TokensSold)
              setPhase1TotalTokensBought(parseInt(_phase1TokensSoldVal))

              const _phase1TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase1()
              const _phase1TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase1TokensSoldFromStableCoin)
              setPhase1TotalTokensBoughtInStableCoin(parseInt(_phase1TokensSoldValFromStableCoin))

              const _phase2TokensSold = await presaleContractInstance.totalTokensSoldInPhase2()
              const _phase2TokensSoldVal = ethers.utils.formatEther(_phase2TokensSold)
              setPhase2TotalTokensBought(parseInt(_phase2TokensSoldVal))

              const _phase2TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase2()
              const _phase2TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase2TokensSoldFromStableCoin)
              setPhase2TotalTokensBoughtInStableCoin(parseInt(_phase2TokensSoldValFromStableCoin))

              const _phase3TokensSold = await presaleContractInstance.totalTokensSoldInPhase3()
              const _phase3TokensSoldVal = ethers.utils.formatEther(_phase3TokensSold)
              setPhase3TotalTokensBought(parseInt(_phase3TokensSoldVal))

              const _phase3TokensSoldFromStableCoin = await stableCoinPresaleContract.totalTokensBoughtInPhase3()
              const _phase3TokensSoldValFromStableCoin = ethers.utils.formatEther(_phase3TokensSoldFromStableCoin)
              setPhase3TotalTokensBoughtInStableCoin(parseInt(_phase3TokensSoldValFromStableCoin))
              //(Math.round(num * 100) / 100).toFixed(2);
              const phase1PercentVal = _phase1TokensSoldVal / _totalTokensToSellInPhase1Val * 100;
              const phase2PercentVal = _phase2TokensSoldVal / _totalTokensToSellInPhase2Val * 100;
              const phase3PercentVal = _phase3TokensSoldVal / _totalTokensToSellInPhase3Val * 100;
              const phase1SoldPercentage = Math.round(phase1PercentVal * 100 / 100).toFixed(2)
              const phase2SoldPercentage = Math.round(phase2PercentVal * 100 / 100).toFixed(2)
              const phase3SoldPercentage = Math.round(phase3PercentVal * 100 / 100).toFixed(2)
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
      loadBlockchainData();
    })

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
            totalBNBSpentByInvestorInPhase1, totalBNBSpentByInvestorInPhase2, totalBNBSpentByInvestorInPhase3,
            phase1TotalTokensBoughtInStableCoin, phase2TotalTokensBoughtInStableCoin, phase3TotalTokensBoughtInStableCoin,
            isPhase1ActiveInStablecoin, isPhase2ActiveInStablecoin, isPhase3ActiveInStablecoin, 
            phase1TotalTokensToSellInStableCoin, phase2TotalTokensToSellInStableCoin, phase3TotalTokensToSellInStableCoin,
            percentageSoldPhase1FrommStableCoin, percentageSoldPhase2FrommStableCoin, percentageSoldPhase3FrommStableCoin,
            overalPercentageSoldPhase1, overalPercentageSoldPhase2, overalPercentageSoldPhase3,stableCoinContract,
            approveUSDTStableCoin, usdtContractInstance,approveBUSDStableCoin,approveUSDCStableCoin,approveDAIStableCoin,
            userDAIBalance, userUSDCBalance, userUSDTBalance, userBUSDBalance,buyTokenWithStableCoin, canShowProgressBar,
            totalTokensBoughtInPhase1InBothContracts, totalTokensBoughtInPhase2InBothContracts, 
            totalTokensBoughtInPhase3InBothContracts,
            totalTokenContributionsClaimedByUserFromStableCoin,
            totalTokenContributionByUserFromStableCoin,
            totalTokenContributionsBoughtByUserInPhase1FromStableCoin,
            totalTokenContributionAggredated, 
            totalTokensBoughtByInvestorInPhase1Aggregated,
            totalTokenContributionsBoughtByUserInPhase3FromStableCoin,
            totalTokenContributionsBoughtByUserInPhase2FromStableCoin,
            totalTokensBoughtByInvestorInPhase2Aggregated,
            totalTokensBoughtByInvestorInPhase3Aggregated,
            totalUsdRaised, presalePhase3Price
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
