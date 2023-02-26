import React from 'react'
import Connex from '@vechain/connex'
import "antd/dist/antd";
import { useEffect, useState } from "react";
import { Row, Col, Input, Table } from "antd"
import Footer from './Footer'


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

export default function App() {
  const [transfers, setTransfers] = useState([]);
  const [address, setAddress] = useState(
    "0x54ffD60A951ea27A2c88c7077ecFa68837487042"
  );

  async function getHistoryFor(address) {
    try {
      const event = connex.thor.account(VESEA_ADDRESS).event(itemBoughtABI);
      const logs = await event
        .filter([{ buyer: address }, { seller: address }])
        .order("desc")
        .apply(0, 20);
      const transfers = logs.map(({ decoded, meta }) => ({
        ...decoded,
        meta
      }));
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
        <h3>Last itemBought Events on VeSea from an address</h3>
        <Input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="change this"
        />
      </Col>
      <Col span={24}>
        <Table dataSource={transfers} pagination={false}>
          <Table.Column
            title="Time"
            dataIndex={["meta", "blockTimestamp"]}
            render={(ts) => new Date(ts * 1000).toISOString()}
          />
          <Table.Column title="Seller" dataIndex="seller" />
          <Table.Column title="Buyer" dataIndex="buyer" />
          <Table.Column title="Token Id" dataIndex="tokenId" />
          <Table.Column title="NFT Address" dataIndex="nftAddress" />
        </Table>
      </Col>
    </Row>
    <Footer />
    </div>
  );
}