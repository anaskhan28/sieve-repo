import React from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';

type Props = {}



const playlist = async (props: Props) => {
  const userData = await getUserData();
if(!userData){
  return redirect('/signup')
}
  return (
    <div>playlist</div>
  )
}

export default playlist