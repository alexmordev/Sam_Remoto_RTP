import React from 'react'
import logo from '../../assets//rtp_sinlogo.png'
import { Image } from 'primereact/image';


export const Imagen = () => {
  return (
    <div>
    <div className='flex justify-content-center flex-wrap card-container p-8 flex align-items-center'>
    <Image imageClassName='w-10rem ' src={logo} alt="RTP" /> 
    </div>
    </div>
  )
}
