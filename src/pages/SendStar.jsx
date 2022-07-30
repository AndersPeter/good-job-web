import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, serverTimestamp, addDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

function SendStar() {
    const initialFormState = {
        name: "",
        email: "",
        numberOfStars: 0
    }

    const [formData, setFormData] = useState(initialFormState)
    const [loading, setLoading] = useState(false)

    const { email } = formData

    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData({ ...initialFormState, userRef: user.uid, name: user.displayName });
            } else {
                navigate('/sign-in');
            }
        });

        return unsubscribe
    }, [auth, navigate]);

    if (loading) {
        return <p>Loading...</p>
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const formDataCopy = {
            ...formData,
            timestamp: serverTimestamp(),
            numberOfStars: 1
        }

        await addDoc(collection(db, 'stars'), formDataCopy)

        setLoading(false)
        toast.success('You sent a star')
        navigate('/')
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }


    return (
        <div className='p-5'>
            <header className=''>
                <p className='font-extrabold text-4xl'>Send a star</p>
            </header>

            <main className='flex flex-col mt-6'>
                <form onSubmit={onSubmit}>
                    <label className='text-xl font-extrabold'>Email</label>
                    <input className='w-full font-mono m-2 p-2 rounded-full border-8 border-transparent shadow-sm shadow-gray-300' type="text" id='email' value={email} onChange={onChange} required />
                    <div className='flex flex-row justify-end '>
                        <button className='text-2xl font-extrabold pr-3' type='submit'>Send star</button>
                        <img className=" fill-white w-10 h-10 bg-teal-700 rounded-full" src={arrowRight} alt="send star" />
                    </div>

                </form>
            </main>

        </div>
    )
}

export default SendStar