import { useState } from 'react'
import './ReviewItem.css'
import { RxAvatar } from 'react-icons/rx'


function ReviewItem({review}) {

    const [showCompleteReview, setShowCompleteReview] = useState(false);

  return (
    <div className='review'>
        <div className="avatar-container">
            {review && review.author_details.avatar_path !== null ? <img src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${review.author_details.avatar_path}`} alt="avatar" className='avatar' /> : <RxAvatar className='avatar'/>}
            <p>{review.author}</p>
        </div>
        {showCompleteReview ? <p className='content'>{review?.content}<span className='read-less' onClick={()=>setShowCompleteReview(false)}>Read Less</span></p> : <p className='content'>{review?.content.slice(0,300)}...<span className='read-less' onClick={()=>setShowCompleteReview(true)}>Read More</span></p>}
    </div>
  )
}

export default ReviewItem