
import React, { useEffect, useState } from 'react';
import {BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './style.css';

export default function ImageSlider({url, limit=5, page=1}) {  // Main Function
  
    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchImages (getUrl) { // Function
        try {
                setLoading(true);

                const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
                const data = await response.json();

                if (data) {
                    setImages(data);
                    setLoading(false);
                }

        } catch(e) {
                setErrorMsg(e.message);
                setLoading(false);
        }

        } // ./ End Function

    useEffect( ()=> {
        if (url !== '' ) fetchImages(url);
    }, [url])

    console.log(images);

    if (loading) {
       return <div> Loading data, please wait !</div>
    }

    if (errorMsg !== null) {
        return <div> There is something wrong, Error {errorMsg}</div>
    }

    function handleprev () {
        setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
    }

    function handlenext () {
        setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
    }

  return (
    <div className='side-container'>
        <BsArrowLeftCircleFill className='arrow arrow-left' onClick={handleprev}/>
        {
            images && images.length ? 
            images.map((imageItem, index)=> (
                <img 
                    className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}
                    key={imageItem.id}
                    alt={imageItem.download_url}
                    src={imageItem.download_url}
                    />
            ))
            : null
        }
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={handlenext} />
        <span className='circle-indicator'>
            {images && images.length ? 
            images.map((_,index)=> (
                <button className={currentSlide === index ? 'current-indicator' : 'current-indicator inactive-indicator'} key={index} onClick={()=> setCurrentSlide(index)}></button>
            ))
             : null}
        </span>
    </div>
  )
}  // ./ End Main Function
