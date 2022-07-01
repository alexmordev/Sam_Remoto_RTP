import React from 'react'
// import logo from '../../assets/rtp_sinlogo.png'
// import logo from '../../assets/rtp_logo.jpeg'
import logo from '../../assets/rtp_sincon.png'
import { Image } from 'primereact/image';


export const Imagen = () => {
  return (
    <div className=''>
    <Image imageClassName='w-10rem ' src={logo} alt="RTP" /> 
    </div>
  )
}
