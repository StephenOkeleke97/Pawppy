import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateGlobal } from '../reducers/global';

const Browse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateGlobal({navBackground: "black"}));
  }, []);
  
  return (
    <div>Browse</div>
  )
}

export default Browse