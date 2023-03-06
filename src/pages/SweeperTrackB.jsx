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


const offerAccepted = {
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
			}
		],
		name: "OfferAccepted",
		type: "event"
}

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
// WoV Offer Accepted + WoV PFP Sale Accepted 

const VESEA_ADDRESS = "0xDafCA4A51eA97B3b5F21171A95DAbF540894a55A";
const VESEA_OFFERS_ADDRESS = "0xdab185Ca52b70e087eC0990aD59C612c3d7aAb14";

export default function App() {
  const [transfers, setTransfers] = useState([]);
  const [address, setAddress] = useState(
    "0xF4D82631bE350c37d92ee816c2bD4D5Adf9E6493"
  );

  async function getHistoryFor(address) {
    try {
      const event = connex.thor.account(VESEA_OFFERS_ADDRESS).event(offerAccepted || CollectionOfferAccepted);
      const logs = await event
        .filter([{ nftAddress:address }])
        .range({
          unit: 'time',
          from: 1678048200,
          to: 1678653000
        })
        .order("desc")
        .apply(0, 200);
      const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta
      }));
      console.log(transfers)
      setTransfers(transfers);
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
    <Row gutter={[32, 32]}>
      <Col span={24} align="center">
        <h3>Mino Mob NFTs offer accepted and collection offer accepted for SweeperClub 3-5-23 to 3-12-23</h3>
      </Col>
      <Col span={24}>
        <Table dataSource={transfers} pagination={true}>
          <Table.Column
            title="Time"
            dataIndex={["meta", "blockTimestamp"]}
            render={(ts) => new Date(ts * 1000).toString()}
          />
          <Table.Column title="Buyer" dataIndex="buyer" />
          <Table.Column title="Token Id" dataIndex="tokenId" />
          <Table.Column title="Price" dataIndex="price" render={(value) => ethers.utils.formatEther(value)} />
        </Table>
      </Col>
    </Row>
    <Footer />
    </div>
  );
}
