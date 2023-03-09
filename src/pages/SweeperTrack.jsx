import React from 'react'
import Connex from '@vechain/connex'
import "antd/dist/antd";
import { useEffect, useState } from "react";
import { Row, Col, Input, Table } from "antd"
import Footer from './Footer'
import { ethers } from '@vechain/ethers';

const connex = new Connex({
  node: 'https://mainnet.veblocks.net',
  network: 'main'
})

const COLLECTION_OFFER_ACCEPTED_ABI = {
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
      indexed: true,
      internalType: "address",
      name: "seller",
      type: "address"
    },
    {
      indexed: false,
      internalType: "address",
      name: "buyer",
      type: "address"
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "price",
      type: "uint256"
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "remainingQty",
      type: "uint256"
    }
  ],
  name: "CollectionOfferAccepted",
  type: "event"
}
const VESEA_ADDRESS = "0xdab185Ca52b70e087eC0990aD59C612c3d7aAb14";
const MINO_ADDRESS = '0xF4D82631bE350c37d92ee816c2bD4D5Adf9E6493';

export default function WalletRanking() {
  const [transfers, setTransfers] = useState([]);
  const [walletCounts, setWalletCounts] = useState({});

  async function getTransfers(minoAddress) {
    try {
      const event = connex.thor.account(VESEA_ADDRESS).event(COLLECTION_OFFER_ACCEPTED_ABI);
      const logs = await event
        .filter([{ nftAddress: minoAddress }])
        .range({
          unit: 'time',
          from: 1678048200,
          to: 1678653000
        })
        .order('desc')
        .apply(0, 200);
  
      const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta
      })); 
  
      setTransfers(transfers);
  
      const counts = {};
      for (const transfer of transfers) {
        console.log(transfer.tokenId);
        const wallet = transfer.buyer;
        if (counts[wallet]) {
          counts[wallet]++;
        } else {
          counts[wallet] = 1;
        }
      }
      setWalletCounts(counts);
    } catch (err) {
      setTransfers([]);
      console.log(err);
    }
  }
  
  useEffect(() => {
    getTransfers(MINO_ADDRESS);
  }, [MINO_ADDRESS]); 
  
  return (
    <div>
      <h2 className='p-2'>Mino Mob Collection Offer Accepted by Wallet 3/5 - 3/12</h2>
      <ul>
        {Object.entries(walletCounts).map(([wallet, count]) => (
          <li key={wallet}>
            {wallet}: {count}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}