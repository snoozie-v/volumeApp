


import React from 'react'
import {Link} from 'react-router-dom'
import Footer from './Footer'
import snoozie from '../assets/snoozie.jpg'

function About() {
  return (
    <div className='bg-[#9fb2c1]'>
      
        <img src={snoozie}></img>
        I love numbers<br/>
        <Footer />
    </div>
  )
}

export default About