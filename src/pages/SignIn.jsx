import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibility from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (userCredential.user) {
        navigate('/')
      }

    } catch (error) {
      toast.error('Bad User Credentials')
    }
  }

  return (
    <>
      <div className='p-10'>
        <header>
          <p className="text-4xl font-extrabold">
            Welcome Back!
          </p>
        </header>

        <main>
          <form onSubmit={onSubmit}>

            <div className='relative'>
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className='mb-1 bg-bagde bg-no-repeat fill-black bg-left' />
              </div>
              <input
                type='email'
                className="w-full pl-10 px-2.5 font-mono my-8 p-2 rounded-full border-8 border-transparent shadow-sm shadow-gray-300"
                placeholder='Email'
                id='email'
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className='mb-1 bg-person bg-no-repeat fill-black bg-left' />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full pl-10 px-2.5 font-mono my-8 p-2 rounded-full border-8 border-transparent shadow-sm shadow-gray-300"
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}

              />
              <img src={visibility} alt="show password" className="p-[1rem] cursor-pointer absolute top-[27%] right-0 " onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>

            <div id="signInBar" className="flex justify-end items-center relative">
              <div className="flex flex-row items-center">
                <p id="signInText" className="font-extrabold justify-start cursor-pointer text-xl">Sign In</p>
                <button id="signInButton" className="flex justify-center items-center w-12 h-12 bg-teal-700 rounded-full ml-4">
                  <ArrowRightIcon className='fill-white w-12 h-12' />
                </button>
              </div>
            </div>
            <Link to='/forgot-password' className="pt-10 cursor-pointer text-teal-700 font-extrabold flex justify-center">Forgot Password</Link>
          </form>

          <div className="pt-10">
            <Link to='/sign-up' id="registerLink" className="cursor-pointer font-extrabold text-teal-700 flex justify-center items-center">
              Sign Up Instead
            </Link>
            {/* Google oAuth */}
            < OAuth />

          </div>

        </main>
      </div>


    </>
  )
}

export default SignIn