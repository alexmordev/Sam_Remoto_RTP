import React from 'react'
import logo from '../../assets//rtp_sinlogo.png'
import { Image } from 'primereact/image';


export const Imagen = () => {
  return (
    <div>
    <Image src={logo} alt="RTP" />
    </div>
  )
}
