import React, { useState } from 'react'
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    Name: "Edward Vincent",
    image:assets.profile_pic,
    email: "edward.vincent@example.com",
    phone: "+1 234 567 890",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B",
    },
    gender: "Male",
    dob: "1990-01-01"
  })

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        isEdit? <input className='bg-gray-50 text-3xl font-meium max-w-60 mt-4' type="text" value={userData.Name} onChange={(e)=>setUserData(prev=>({...prev, Name: e.target.value}))}/>: 
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.Name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div></div>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          <p>{userData.phone}</p>

          <p className='font-medium'>Address:</p>
          {
            isEdit? <p>
              <input className='bg-gray-50' onChange={(e)=>setUserData(prev=>({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
              <br />
              <input className='bg-gray-50' onChange={(e)=>setUserData(prev=>({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
            </p>: 
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
          
       
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='front-medium'>Gender:</p>
          {
            isEdit? <select className='max-w-20 bg-gray-100' onChange={(e)=>setUserData(prev=>({...prev, gender: e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Date of Birth:</p>
          {
            isEdit? <input className='max-w-20 bg-gray-100' type="date" onChange={(e)=>setUserData(prev=>({...prev, dob: e.target.value}))}/>: <p>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {isEdit? 
        <button className='border border-primary px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' onClick={()=>setIsEdit(false)}>Save</button>
        : <button className='border border-primary px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>}
      </div>
    </div>
  )
}

export default MyProfile
