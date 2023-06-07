import React, { useEffect } from 'react';
import { slideshow } from '../composables/slideshow';
import image1 from "../assets/slideshow-ex-1.jfif"
import image2 from "../assets/slideshow-ex-2.jfif"
import image3 from "../assets/slideshow-ex-3.jfif"
export default function Slideshow() {

    useEffect(()=>{
        slideshow("slider");
    }, [""])
  return (
    <div id="slider" className='h-[400px]'>
      <img src={image1} alt='example image' className='h-full w-full object-cover' />
      <img src={image2} alt='example image' className='h-full w-full object-cover' />
      <img src={image3} alt='example image' className='h-full w-full object-cover' />
    </div>
  )
}
