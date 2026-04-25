import React, { useState } from 'react'

const Login = () => {

  const [state,setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler=async(e)=>{
    e.preventDefault();


  }
  return (
    <div>
      <form className='min-h-[80vh flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state==='Sign Up'?"Create account":"Login"}</p>
          <p>{state==='Sign Up'?"Sign up ":"log in to book an appointment"}Please sign up to book appointment</p>
          {state==="Sign Up" && <div className='w-full '>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.value)} value={name} required/>
          </div>
          }
          
          <div className='w-full '>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
          </div>
          <div className='w-full '>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
          </div>
          <button className='bg-blue-500 text-white w-full text-500px pt-2 pb-2 pl-2 pr-2 rounded'>{state==='Sign Up'?"Create account":"Login"}</button>
          {
            state === "Sign Up"
            ? <p>Already have an account?<span onClick={()=>setState("Login")} className='text-blue-500 underline cursor-pointer'> Login here</span></p>
            : <p>Don't have an account? <span onClick={()=>setState("Sign Up")} className='text-blue-500 underline cursor-pointer'>Sign up here</span></p>
          }
        </div>
      </form>
    </div>
  )
}

export default Login
