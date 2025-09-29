import { useState } from 'react';
import './ReviewItem.css';
import { RxAvatar } from 'react-icons/rx';

function ReviewItem({ review }) {
  const [showCompleteReview, setShowCompleteReview] = useState(false);
  const content = review?.content || '';
  const previewLength = 320;
  const isLong = content.length > previewLength;

  return (
    <article className='review-card'>
      <div className='review-card__avatar'>
        {review && review.author_details.avatar_path ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_IMAGE_URL}${review.author_details.avatar_path}`}
            alt='avatar'
          />
        ) : (
          <RxAvatar />
        )}
        <p>{review?.author}</p>
      </div>
      <div className='review-card__content'>
        <p>
          {showCompleteReview || !isLong ? content : `${content.slice(0, previewLength)}…`}
        </p>
        {isLong && (
          <button
            className='review-card__toggle'
            type='button'
            onClick={() => setShowCompleteReview((prev) => !prev)}
          >
            {showCompleteReview ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </article>
  );
}

export default ReviewItem;
