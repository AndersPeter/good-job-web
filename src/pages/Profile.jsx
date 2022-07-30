import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Profile() {
  const auth = getAuth()
  const [changeName, setChangeName] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const { name, email } = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/sign-in')
  }

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name
        })
        //update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update name')

    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div id='profile' className='mb-2.5 p-5'>
      <header id='profileHeader' className='flex justify-between items-center'>
        <p id='pageHeader' className='font-extrabold text-4xl'>My Profile</p>
        <button type='button' id='logOut' className='cursor-pointer font-mono text-base text-white bg-emerald-700 rounded-full p-2 shadow-sm shadow-gray-300 ' onClick={onLogout}
        >Logout
        </button>
      </header>

      <main>
        <div id='profileDetailsHeader' className='flex justify-between max-h-[500px] mt-10'>
          <p id='profileDetails' className='flex flex-col font-bold font-mono text-xl'>Personal Details</p>
          <button id='changePersonalDetails' className='cursor-pointer font-bold' onClick={() => {
            changeName && onSubmit()
            setChangeName((prevState) => !prevState)
          }}>
            {changeName ? 'done' : 'change name'}
          </button>
        </div>

        <div id='profilCard' className=' max-w-[500px] bg-white rounded-full p-1 shadow-sm shadow-gray-300'>
          <form>
            <input type="text"
              id='name'
              className={!changeName ? 'm-1 font-bold w-full' : 'bg-slate-300 m-1 font-bold w-full'}
              disabled={!changeName}
              value={name}
              onChange={onChange} />
          </form>
        </div>

        <div id='profilCard' className='max-w-[500px] bg-white rounded-full p-1 shadow-sm shadow-gray-300 mt-3'>
          <div className=''>
            <p className='m-1 font-bold w-full'>Email: {email} </p>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Profile;