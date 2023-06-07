import React from 'react'

export default function SignUp() {
  //account sign up form

  const form = React.createRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const payload = Object.fromEntries(formData.entries());
    

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    };

    fetch(`/register`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="my-20 px-20 bg-white rounded-xl border-slate shadow-xl flex flex-col justify-center items-center max-w-[450px] w-full">
        <h2 className="pt-10 text-4xl font-poppins font-extrabold my-2">Sign Up</h2>
        <div className="mt-10 pb-32 pt-10">
          <form ref={form} onSubmit={handleSubmit}>
         
            <label htmlFor="email" className="font-poppins text-lg pb-5 font-medium">Email:</label>
            <input type="email" name="email" id="email" className="border border-slate rounded-md w-full p-2" required/>
            <label htmlFor="password" className="font-poppins text-lg pb-5 font-medium">Password:</label>
            <input type="password" name="password" id="password" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="password_confirmation" className="font-poppins text-lg pb-5 font-medium">Confirm Password:</label>
            <input type="password" name="password_confirmation" id="password_confirmation" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="first_name" className="font-poppins text-lg pb-5 font-medium">First Name:</label>
            <input type="text" name="first_name" id="first_name" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="last_name" className="font-poppins text-lg pb-5 font-medium">Last Name:</label>
            <input type="text" name="last_name" id="last_name" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="phone_number" className="font-poppins text-lg pb-5 font-medium">Phone Number:</label>
            <input type="text" name="phone_number" id="phone_number" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="address" className="font-poppins text-lg pb-5 font-medium">Address:</label>
            <input type="text" name="address" id="address" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="city" className="font-poppins text-lg pb-5 font-medium">City:</label>
            <input type="text" name="city" id="city" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="state" className="font-poppins text-lg pb-5 font-medium">State:</label>
            <input type="text" name="state" id="state" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="zip_code" className="font-poppins text-lg pb-5 font-medium">Zip Code:</label>
            <input type="text" name="zip_code" id="zip_code" className="border border-slate rounded-md w-full p-2" />
            <label htmlFor="country" className="font-poppins text-lg pb-5 font-medium">Country:</label>
            <input type="text" name="country" id="country" className="border border-slate rounded-md w-full p-2" />
            <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white rounded-md w-full p-2 mt-5">Sign Up</button>
          </form>
          </div>
      </div>
    </div>
  )
}