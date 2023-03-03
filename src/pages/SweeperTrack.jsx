import React from 'react';
import Connex from '@vechain/connex';
import "antd/dist/antd";
import Footer from './Footer';


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

const connex = new Connex({
  node: 'https://mainnet.veblocks.net',
  network: 'main'
})

const filter = connex.thor.filter('event', [{
        "topic0": "0xf206e7b297bafe2d31f147e6050538b35b5dd424b658411bd58cfccfdf7b3781"
    }])

filter
    .order('desc')

filter.apply(0,1).then(logs=>{
    console.log(logs)
})

function SweeperTrack() {
  return (
    <div className=''>
      Console Shows the Last itemBought event, how do I also get decoded when filtering by Topic0?
      <br></br><Footer />
    </div>
  )
}

export default SweeperTrack





