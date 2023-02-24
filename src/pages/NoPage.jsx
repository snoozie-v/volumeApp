import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'

function NoPage() {
  return (
    <div>
      This is under construction <br/>
        <Link to='/home'>Go Back</Link>
        <Footer />
    </div>
  )
}

export default NoPage
