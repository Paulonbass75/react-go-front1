import React, { useEffect } from 'react';
import { slideshow } from '../composables/slideshow';
import image1 from "../assets/slideshow-ex-1.jfif"
import image2 from "../assets/slideshow-ex-2.jfif"
import image3 from "../assets/slideshow-ex-3.jfif"

export default function Slideshow() {

  let options = {
    intervalSpeed: null
  }

    useEffect(()=>{
    slideshow("slider", options);
    let nextNum = 1;
    const slideshowIntervals = setInterval(() => {
      const elements = Array.from(document.getElementById("slider").children);
      document.getElementById(`slider-img-${nextNum}`).classList.remove("showing")
      document.getElementById(`slider-img-${nextNum}`).classList.add("transitioning-out")
      nextNum+=1
      let prevNum = nextNum - 1
      setTimeout(() => {
          document.getElementById(`slider-img-${prevNum != 1 ? prevNum : 1}`).classList.remove("transitioning-out")
      }, 1000)
      if(nextNum > elements.length) nextNum = 1;
      document.getElementById(`slider-img-${nextNum}`).classList.add("transitioning-in")
      setTimeout(() => {
          document.getElementById(`slider-img-${nextNum}`).classList.remove("transitioning-in")
      }, 1000)
      document.getElementById(`slider-img-${nextNum}`).classList.add("showing")
      }, options.intervalSpeed != null ? options.intervalSpeed : 3000)

    return () => clearInterval(slideshowIntervals)
    }, [])
  return (
    <div id="slider" className='h-[400px]'>
      <img src={image1} alt='example' className='h-full w-full object-cover' />
      <img src={image2} alt='example' className='h-full w-full object-cover' />
      <img src={image3} alt='example' className='h-full w-full object-cover' />
    </div>
  )
}
