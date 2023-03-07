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

const CollectionOfferAccepted = {
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
const VESEA_OFFERS_ADDRESS = "0xdab185Ca52b70e087eC0990aD59C612c3d7aAb14";

export default function App() {
  const [transfers, setTransfers] = useState([]);
  const [walletCountsA, setWalletCountsA] = useState({});
  const [address, setAddress] = useState(
    "0xF4D82631bE350c37d92ee816c2bD4D5Adf9E6493"
  );

  async function getHistoryFor(address) {
    try {
      const event = connex.thor.account(VESEA_OFFERS_ADDRESS).event(CollectionOfferAccepted);
      const logs = await event
        .filter([{ nftAddress: address }])
        .range({
          unit: 'time',
          from: 1677443400,
          to: 1678048200
        })
        .order("desc")
        .apply(0, 200);
        console.log(logs)
      const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta, 
      }));
  
      setTransfers(transfers);

      for (let i = 0; i < transfers.length; i++) {
        console.log(transfers[i].tokenId)
        const wallet = transfers[i].buyer;
        if (walletCountsA[wallet]){
            walletCountsA[wallet] += 1;
        } else {
            walletCountsA[wallet] = 1;
        }
  }

  setWalletCountsA(walletCountsA)

    } catch (err) {
      setTransfers([]);
      console.log(err);
    }
  }

  useEffect(() => {
    getHistoryFor(address);
  }, [address]);


  return (
    <div>
       <div> <h2>Mino mob, Collection Offer accepted for 2/26 - 3/5 </h2>
      <ul>
        {Object.entries(walletCountsA).map(([wallet, count]) => (
          <li key={wallet}>
            {wallet}: {count}
          </li>
        ))}
      </ul></div>
    <Footer />
    </div>
  );
}