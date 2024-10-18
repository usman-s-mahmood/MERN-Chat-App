import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <>
    <div className='flex flex-col items-center justify-center min-w-36 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-d bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <p className="text-4xl text-center text-white"><strong>Signup <span className="text-blue-200">MERN Chat App</span></strong></p>

        <form action="">
          <label htmlFor="" className="label p-2"><span className="text-white label-text">Full Name</span></label>
          <input type="text" className="w-full input input-bordered h-10" placeholder='Enter your Full Name' name='name'/>

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Username</span></label>
          <input type="text" className="w-full input input-bordered h-10" placeholder='Enter your Unique Username' name='username' />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Gender</span></label>
          <select type="text" className="w-full input input-bordered h-10" placeholder='Enter your Full Name' defaultValue={''} name='gender'>
            <option value="" disabled>Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Password</span></label>
          <input type="password" className="w-full input input-bordered h-10" placeholder='Enter your password' name='password' />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Confirm Password</span></label>
          <input type="password" className="w-full input input-bordered h-10" placeholder='Confirm your password' name='confirm_password' />

          <div className="text-center">
            <button className="btn btn-block btn-sm mt-2" type='submit'>Submit</button>
          </div>

          <div className="text-center mt-2">
          <span className="text-lg text-white">Already have an account, <Link to='/login' className='text-blue-300'>Login</Link></span>
            
          </div>
        </form>
      </div>
      
    </div>
    </>
  );
}

export default Signup
