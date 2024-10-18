import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-36 mx-auto'>
      <div className="w-full p-6 rounded-lg shadow-d bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <p className="text-4xl text-center text-white"><strong>Login <span className="text-blue-200">MERN Chat App</span></strong></p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="" className="label p-2"><span className="text-white label-text">Username</span></label>
          <input type="text" className="w-full input input-bordered h-10" placeholder='Enter your username' 
          required
            minLength={5}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="" className="label p-2"><span className="text-white label-text">Password</span></label>
          <input type="password" className="w-full input input-bordered h-10" placeholder='Enter your password' 
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="text-center">
            <button className="btn btn-block btn-sm mt-2" type='submit' disabled={loading}>{!loading?'Submit': (<span className='loading loading-spinner text-white'></span>)}</button>
          </div>
          <div className="text-center mt-2">
          <span className="text-lg text-white">Create an account, <Link to='/signup' className='text-blue-300'>Signup</Link></span>
            
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default Login
