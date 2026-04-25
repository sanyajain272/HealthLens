import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-30 text-black-700'>
        {/*Left Section*/}
        <div>
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-black-600 leading-6'>Prescripto is your trusted healthcare companion. 
            We connect patients with certified doctors and provide 
            seamless appointment booking, consultations, and health resources.</p>
        </div>

        {/*Center Section*/}
        <div >
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-black-600'>
                <li>Home</li>
                <li>About</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        {/*Right Section*/}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-black-600'>
                <li>+91-9876543219</li>
                <li>info@company.com</li>
            </ul>
        </div>
      </div>
      <div>
        <p className='text-center text-gray-500 text-sm'>© 2025 Company Name. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
