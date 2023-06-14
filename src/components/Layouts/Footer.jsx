import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] object-cover w-full flex items-center flex-col text-white ">
      <div className="container px-6 pt-6">
        <div className="grid-cols-1 grid items-center justify-center gap-2 md:grid-cols-3">
          <p>
            Auto Metal Direct 3348 Gateway Centre Parkway Gainesville, GA 30507
            Toll-Free: (833) 404-4777 Local: (770) 967-0909 Fax: (770) 692-6360
            Sales Hours: Mon-Fri 8am-6pm est Counter Hours: Mon-Fri 8am-5pm est
          </p>
        </div>
      </div>
    </footer>
  );
}