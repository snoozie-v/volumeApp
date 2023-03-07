import React from 'react';
import Connex from '@vechain/connex';
import { useState, useEffect } from 'react';
import Footer from './Footer';

const connex = new Connex({
    node: 'https://mainnet.veblocks.net',
    network: 'main'
  })

const itemBoughtABI = {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "nftAddress",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256"
      }
    ],
    name: "ItemBought",
    type: "event"
  };
  
const VESEA_ADDRESS = "0xDafCA4A51eA97B3b5F21171A95DAbF540894a55A";
const MINO_ADDRESS = '0xF4D82631bE350c37d92ee816c2bD4D5Adf9E6493';

export default function WalletRanking() {
    const [transfers, setTransfers] = useState({})
    const [walletCounts, setWalletCounts] = useState({});

    async function getTransfers(MINO_ADDRESS) {
        try {
        const event = connex.thor.account(VESEA_ADDRESS).event(itemBoughtABI);
        const logs = await event
        .filter([{ nftAddress:MINO_ADDRESS }])
        .range({
        unit: 'time',
        from: 1677443400,
          to: 1678048200
        })
        .order('desc')
        .apply(0,200)
        
        const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta
      })); 
    
      setTransfers(transfers)
      
      

      for (let i = 0; i < transfers.length; i++) {
        console.log(transfers[i].tokenId)    
        const wallet = transfers[i].buyer;
            if (walletCounts[wallet]){
                walletCounts[wallet] += 1;
            } else {
                walletCounts[wallet] = 1;
            }
      }

setWalletCounts(walletCounts)
     
} catch (err) {
    setTransfers([]);
    console.log(err)
}}

useEffect(() => {
    getTransfers(MINO_ADDRESS);
  }, [MINO_ADDRESS]); 

  return (
    <div>
      <h2 className='p-2'>Mino Mob Item Bought by wallet 2/26 - 3/5</h2>
      <ul>
        {Object.entries(walletCounts).map(([wallet, count]) => (
          <li key={wallet}>
            {wallet}: {count}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}


