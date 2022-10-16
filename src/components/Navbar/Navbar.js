import React, { useState, useContext } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { PresaleContext }  from '../../context/PresaleContext';

import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const { isConnected, connectWallet, disconnectWallet } = useContext(PresaleContext);

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  const handleClose = () => setNav(!nav);

  return (
    <div className="w-screen h-[80px] z-10 bg-slate-900 text-gray-300 fixed top-0 shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl"><span className="text-orange-600">AJIRA</span> <span className="text-yellow-600">PAY</span></h1>
          <ul className="hidden md:flex">
            <li>
              <Link to="home" smooth={true} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-200} duration={500}>
                About
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-200} duration={500}>
                Tokenomics
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-200} duration={500}>
                Airdrop
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">
          { !isConnected ?
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={connectWallet}>
            Connect Wallet
          </button>
          :
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={disconnectWallet}>
            Disonnect Wallet
          </button>
        }
        </div>
        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
        <li className="w-full text-black">
          <Link onClick={handleClose} to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="w-full text-black">
          <Link
            onClick={handleClose}
            to="about"
            smooth={true}
            offset={-200}
            duration={500}
          >
            About
          </Link>
        </li>
        <li className="w-full text-black">
          <Link
            onClick={handleClose}
            to="about"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Tokenomics
          </Link>
        </li>
        <li className="w-full text-black">
          <Link
            onClick={handleClose}
            to="about"
            smooth={true}
            offset={-200}
            duration={500}
          >
            Airdrop
          </Link>
        </li>
        <div className="flex flex-col my-4">
        { !isConnected ?
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={connectWallet}>
            Connect Wallet
          </button>
          :
          <button className="border bg-transparent px-2 py-2 text-white mr-4" onClick={disconnectWallet}>
            Disonnect Wallet
          </button>
        }
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
