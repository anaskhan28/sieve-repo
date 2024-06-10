import React from 'react'
import getUserData from '../actions/getUserData'

type Props = {}



const playlist = async (props: Props) => {
  const userData = await getUserData();

  console.log(userData)
  return (
    <div>playlist</div>
  )
}

export default playlist