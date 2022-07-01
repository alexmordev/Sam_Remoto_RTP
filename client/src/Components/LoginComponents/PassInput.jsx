import React,{useState} from 'react'
import { Password } from 'primereact/password';


export const PassInput = () => {
  const [value3, setValue3] = useState('');
  
  return (
    <div >
      <span className="p-float-label">
              <Password inputClassName='w-18rem h-4rem' feedback={false}  value={value3} onChange={(e) => setValue3(e.target.value)}  toggleMask/>
              <label htmlFor="password">Contraseña</label>
      </span>
    </div>
)}
/* 
<div class = "flex align-items-center justify-content-center  font-bold text-gray-900 m-2 px-5 py-3 border-round">
  
  <Password value={value3} onChange={(e) => setValue3(e.target.value)} toggleMask />

</div> */
