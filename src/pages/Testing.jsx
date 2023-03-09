
import React, { useState, useEffect } from 'react';
import Connex from '@vechain/connex';
import Footer from './Footer';

const connex = new Connex({
  node: 'https://mainnet.veblocks.net',
  network: 'main'
});

const ITEM_BOUGHT_ABI = {
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
  const [transfers, setTransfers] = useState([]);
  const [walletCounts, setWalletCounts] = useState({});

  async function getTransfers(minoAddress) {
    try {
      const event = connex.thor.account(VESEA_ADDRESS).event(ITEM_BOUGHT_ABI);
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
      <h2 className='p-2'>Mino Mob Item Bought by wallet 3/5 - 3/12</h2>
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
