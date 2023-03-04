import React from 'react'
import Footer from './Footer'
import Connex from '@vechain/connex'

const connex = new Connex({
    node: 'https://mainnet.veblocks.net',
    network: 'main'
  })

const filter = connex.thor.filter('event', [
    {
    topic0: '0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c' // itemBought
    },
    {
    topic0: '0x47b97c7cbd7d3ec9d5cc511f0b698f7fe0b891454fc558e49eb656c216b44597' // offerAccepted
    },
    {
    topic0: '0x4ca8b1b36993597695f98cb2ecd352fa4cbb6f8b5e65657c414b9b9fd882d021' // collectionOfferAccepted
    }
])

filter.apply(0,3).then(logs=>(
    console.log(logs)
))

function TopicZero() {
  return (
    <div>
      Figuring out how to decode data when searching for Topic0 on this tab
      <Footer />
    </div>
  )
}

export default TopicZero
