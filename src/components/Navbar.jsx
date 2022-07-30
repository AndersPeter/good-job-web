import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as Star } from '../assets/svg/star.svg'
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true
    }
  }



  return (
    <footer className='fixed left-0 bottom-0 right-0 h-[85px] bg-emerald-300 z-1000 flex justify-center items-center'>
      <nav className="w-full overflow-y-hidden ">
        <ul className="m-0 p-0 flex justify-evenly items-center border-2 bg-white">
          <li className="cursor-pointer flex flex-col items-center hover:font-bold" onClick={() => navigate('/')}>
            <Star className={`w-9 h-9 ${pathMatchRoute('/') ? 'fill-stone-800' : 'fill-slate-400'}`} />
            <p className={`text-sm ${pathMatchRoute('/') ? 'text-stone-800' : 'text-slate-400'}`}> Your Stars</p>
          </li>
          <li className="cursor-pointer flex flex-col items-center hover:font-bold"
            onClick={() => navigate('/profile')}>
            <PersonOutlineIcon className={`w-9 h-9 ${pathMatchRoute('/profile') ? 'fill-stone-800' : 'fill-slate-400'}`} />
            <p className={`text-sm ${pathMatchRoute('/profile') ? 'text-stone-800' : 'text-slate-400'}`}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}


export default Navbar