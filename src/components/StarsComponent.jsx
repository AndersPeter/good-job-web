import { ReactComponent as Star } from '../assets/svg/star.svg'


function StarsComponent({ star, id }) {

    return (

        <div className='grid grid-cols-2 gap-0 justify-items-start pl-3'>
            <div className='flex flex-row'>
                {Array.from({ length: star.numberOfStars }).map(() =>
                    <Star key={star.id} id={star.id} className="fill-gold" />
                )}
            </div>

            <p key={star.id} id={star.id} className='font-bold text-base'>{star.name}</p>
        </div>
    )

}

export default StarsComponent



