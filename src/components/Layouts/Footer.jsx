import React from 'react'
import logo from "../../images/store_logo.png"
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] object-cover w-full flex items-center flex-col text-white mt-32 py-10">
      <div className="container px-6 pt-6">
        <div className="flex justify-center items-center flex-col">
          <img src={logo} alt="logo" className='max-w-[150px] mb-10'/>
          <p className='w-1/2 text-center font-semibold'>
            Auto Metal Direct 3348 Gateway Centre Parkway Gainesville, GA 30507
            <br />
            Toll-Free: (833) 404-4777 Local: (770) 967-0909 Fax: (770) 692-6360
            <br />
            Sales Hours: Mon-Fri 8am-6pm EST Counter Hours: Mon-Fri 8am-5pm EST
          </p>
        </div>
      </div>
    </footer>
  );
}
