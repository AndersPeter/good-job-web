import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibility from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className='p-5'>
        <header>
          <p className="text-4xl font-extrabold">
            Sign Up
          </p>
        </header>

        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className="w-full font-mono my-8 p-2 rounded-full border-8 border-transparent bg-bagde bg-right bg-no-repeat shadow-sm shadow-gray-300"
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              className="w-full font-mono my-8 p-2 rounded-full border-8 border-transparent bg-bagde bg-right bg-no-repeat shadow-sm shadow-gray-300"
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full font-mono my-8 p-2 rounded-full border-8 border-transparent bg-person bg-right bg-no-repeat shadow-sm shadow-gray-300"
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}

              />
              <img src={visibility} alt="show password" className="p-[1rem] cursor-pointer absolute top-[27%] right-[8%] " onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>


            <div id="signUpBar" className="flex justify-end items-center relative">
              <div className="flex flex-row items-center">
                <p id="signUpText" className="font-extrabold justify-start cursor-pointer text-xl">Sign Up</p>
                <button id="signUpButton" className="flex justify-center items-center w-12 h-12 bg-emerald-700 rounded-full ml-4">
                  <ArrowRightIcon className='fill-white w-12 h-12' />
                </button>
              </div>
            </div>
            <Link to='/forgot-password' className="pt-10 cursor-pointer text-teal-700 font-extrabold flex justify-center">Forgot Password</Link>
          </form>

          <div className="pt-10">
            <Link to='/sign-in' id="registerLink" className="cursor-pointer font-extrabold text-teal-700 flex justify-center items-center">
              Sign In Instead
            </Link>
            {/* Google oAuth */}

          </div>

        </main>
      </div>


    </>
  )
}

export default SignUp