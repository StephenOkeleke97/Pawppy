import React, { useEffect, useState } from 'react'

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    //Get favorites
  }, []);

  return (
    <div className='user-tabs-container favorites-container'>
      <div>
        <h1>Favorites</h1>
      </div>

      <div className='favorites-content'>
        {favorites.length <= 0 ? 
        <p className='favorites-empty'>You do not have any favorites.</p>
        : 
        <div></div>}
      </div>
    </div>
  )
}

export default Favorites