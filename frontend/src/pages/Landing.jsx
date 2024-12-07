import React from 'react'
import Hero from '../components/custom/Hero'
import Features from '../components/custom/Features'
import Testimonials from '../components/custom/Testimonials'
import SmoothScroll from '../components/custom/SmoothScroll'
import Faq from '../components/custom/Faq'
import Footer from '../components/custom/Footer'
import BuiltWith from '../components/custom/BuiltWith'

function Landing() {
  return (
    <div className=' bg-black'>
        <Hero/>
        <BuiltWith/>
        <Features/>
        <Testimonials/>
        {/* <SmoothScroll/> */}
        <Faq/>
        <Footer/>
    </div>
  )
}

export default Landing