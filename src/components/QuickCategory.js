import React from 'react'

const QuickCategory = ({ name, image }) => {
  return (
    <div className='quick-category-container'>
        <div className='quick-category-image-container'>
            <img src={image} alt="description" className='quick-category-image'/>
        </div>
        <div className='quick-category-name'>
        {name}
        </div>
    </div>
  )
}

export default QuickCategory