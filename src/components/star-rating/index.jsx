import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './style.css';

export default function StarRating({noOfStars=5}) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick (getCurrentIndex) {  // Function
        setRating(getCurrentIndex);
        // console.log('handle Click', getCurrentIndex);
    } //  ./ End Function
    

    function handleMouseEnter (getCurrentIndex) {  // Function
        setHover(getCurrentIndex);
        // console.log('handle Mouse Enter', getCurrentIndex);
    } //  ./ End Function
    

    function handleMouseLeave (getCurrentIndex) {  // Function
        setHover(rating);
        // console.log('handle Mouse Leave', getCurrentIndex);
    } //  ./ End Function
    
  return ( <div className='star-rating'>

            {
                [...Array(noOfStars)].map((_, index) => {
                index += 1;
                {/* console.log('index',index); */}

                return <FaStar
                        key={index}
                        className={index <= (hover || rating) ? "active" : "inactive"}
                        onClick={()=> handleClick(index)}
                        onMouseMove={()=> handleMouseEnter(index)}
                        onMouseLeave={()=> handleMouseLeave()}
                        size={40}
                    />
            })
            }

    </div>
  )
}
