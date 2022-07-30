import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import StarsComponent from '../components/StarsComponent'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

const Stars = () => {
  const [stars, setStars] = useState(null)
  const [loading, setLoading] = useState(true)

  const auth = getAuth()

  useEffect(() => {
    const fetchUserStars = async () => {
      try {
        //get reference
        const starRef = collection(db, 'stars')

        //create a query
        const q = query(
          starRef,
          where('email', '==', auth.currentUser.email)
        )

        //execute query
        const querySnap = await getDocs(q)

        const stars = []

        querySnap.forEach((doc) => {
          return stars.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setStars(stars)
        setLoading(false)

      } catch (error) {
        toast.error('Could not get stars - sorry')

      }
    }
    fetchUserStars()

  }, [auth.currentUser.uid, auth.currentUser.email])

  return (


    <div id="stars" className='p-5'>
      <header className=''>
        <p id="header" className='text-4xl font-extrabold'>Stars</p>
      </header>

      <Link to="/send-star" className='flex justify-evenly items-center mt-5 p-2 border-slate-400 border bg-white rounded-full'>
        <p className='text-2xl font-extrabold'>Send a star to someone!</p>
        <img className=" fill-white w-12 h-12 bg-teal-700 rounded-full left" src={arrowRight} alt="send star" />
      </Link>

      {loading ? 'Loading...' : stars && stars.length > 0 ? <>

        <main>
          <div className='mt-5'>
            <div className='grid grid-cols-2 gap-0 justify-items-start'>
              <p className='text-base font-extrabold text-clip'>Stars</p>
              <p className='text-base font-extrabold text-clip pl-2'>Sent by</p>
            </div>

            {
              stars.map((star) => (
                <>
                  <StarsComponent
                    star={star.data}
                    id={star.id}
                    key={star.id} />
                </>
              ))
            }
          </div>
        </main></> : <p>No stars yet</p>}
    </div>
  )
}

export default Stars