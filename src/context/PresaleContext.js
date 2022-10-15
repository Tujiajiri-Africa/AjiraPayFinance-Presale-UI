import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const PresaleContext = React.createContext();

export const PresaleContextProvider = ({ children }) => {

    const [connected, setConnected] = useState(false)
    const [provider, setProvider] = useState(null)

    const connectWallet = async() =>{

    }

    const discConnectWallet = async() => {

    }

    const getActiveAccount = async() => {

    }

    const buyToken = async() => {

    }
    

    return (
        <PresaleContext.Provider value={{
            connected, provider, connectWallet, discConnectWallet, getActiveAccount, buyToken
        }}>
            {children}
        </PresaleContext.Provider>
    )
}
