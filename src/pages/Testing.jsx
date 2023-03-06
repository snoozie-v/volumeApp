import React from 'react';
import Connex from '@vechain/connex';

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

const event = connex.thor.account(VESEA_ADDRESS).event(itemBoughtABI);

function Testing() {
  return (
    <div>
      Hello
    </div>
  )
}

export default Testing
