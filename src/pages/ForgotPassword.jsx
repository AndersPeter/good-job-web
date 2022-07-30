import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'


function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = (e) => setEmail(e.target.value)


  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast('Reset email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }



  return (
    <div id='pageContainer' className='p-10'>
      <header>
        <p id='pageHeader' className='font-extrabold text-2xl'>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          {/*emailInput */}
          <div className="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className='mb-1 bg-person bg-no-repeat fill-black bg-left' />
            </div>
            <input type="email" id='email'
              className="w-full pl-10 px-2.5 font-mono my-8 p-2 rounded-full border-8 border-transparent shadow-sm shadow-gray-300"
              placeholder='Email' value={email} onChange={onChange} />
          </div>

          <div id="sendResetLink" className="flex justify-end items-center relative">
            <div className="flex flex-row items-center">
              <p id="sendResetText" className="font-extrabold justify-start cursor-pointer text-xl">Send Reset Link</p>
              <button id="sendResetButton" className="flex justify-center items-center w-12 h-12 bg-teal-700 rounded-full ml-4">
                <ArrowRightIcon className='fill-white w-12 h-12' />
              </button>
            </div>
          </div>

          <div className="pt-10">
            <Link to='/sign-in' id="registerLink" className="cursor-pointer font-extrabold text-teal-700 flex justify-center items-center">
              Sign In
            </Link>
            {/* Google oAuth */}

          </div>

        </form>
      </main>

    </div>

  )
}

export default ForgotPassword