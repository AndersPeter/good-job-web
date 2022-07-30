import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {

        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            //if user, dosen't exist, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not authorize with Google')

        }
    }

    return (
        <div id='socialLogin' className='flex flex-col justify-center items-center mt-9'>
            <p className='text-lg font-bold'>Sign {location.pathname === 'sign-up' ? 'up ' : 'in '}
                with</p>
            <button id='socialIconDiv' className='' onClick={onGoogleClick}>
                <img id='socialIconImg' className='h-14 w-14' src={googleIcon} alt="google sign in" />

            </button>
        </div>
    )
}

export default OAuth