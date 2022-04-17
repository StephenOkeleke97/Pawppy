import React, { useEffect, useState } from 'react'

const Animal = ({ animal }) => {
    const imageSrc = animal.photos;
    const [image, setImage] = useState("");
    useEffect(() => {
        if (imageSrc.length > 0) {
            setImage(imageSrc[0].full);
        }
    }, []);
  return (
    <div className='animal-card'>
        <div className='animal-card-image-container'>
            <img className='animal-card-image' src={image} alt={animal.name} />
        </div>
        <div className='animal-card-title'>
            <h1>{animal.name}</h1>
        </div>
    </div>
  )
}

export default Animal