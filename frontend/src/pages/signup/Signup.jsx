import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
  });
  const [loading, signup] = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputs);
      await signup(inputs);
      setInputs({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
      });
    } catch(error) {
      console.error(error.message);
    }
  }


  return (
    <>
    <div className='flex flex-col items-center justify-center min-w-36 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-d bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <p className="text-4xl text-center text-white"><strong>Signup <span className="text-blue-200">MERN Chat App</span></strong></p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="" className="label p-2"><span className="text-white label-text">Full Name</span></label>
          <input type="text" className="w-full input input-bordered h-10" placeholder='Enter your Full Name' name='fullName'
            value={inputs.fullName}
            onChange={(e) => setInputs({...inputs, fullName: e.target.value})}
            required
            minLength={2}
          />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Username</span></label>
          <input type="text" className="w-full input input-bordered h-10" placeholder='Enter your Unique Username' name='username'
            value={inputs.username}
            onChange={(e) => setInputs({...inputs, username: e.target.value})}
            required
            minLength={5}
           />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Gender</span></label>
          <select type="text" className="w-full input input-bordered h-10" placeholder='Enter your Full Name' name='gender'
          value={inputs.gender}
          onChange={(e) => setInputs({...inputs, gender: e.target.value})}
          required
          >
            <option value="" disabled>Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Password</span></label>
          <input type="password" className="w-full input input-bordered h-10" placeholder='Enter your password' name='password'
            value={inputs.password}
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            required
            minLength={8}
           />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Confirm Password</span></label>
          <input type="password" className="w-full input input-bordered h-10" placeholder='Confirm your password' name='confirmPassword' 
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
            required
            minLength={8}
          />

          <div className="text-center">
            <button className="btn btn-block btn-sm mt-2" type='submit' disabled={loading}>{loading? (<span className='loading loading-spinner bg-white'></span>): 'Submit'}</button>
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
