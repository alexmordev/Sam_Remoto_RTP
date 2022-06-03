import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';


export const UserInput = () => {
  const [value2, setValue2] = useState('');

  return (
    <div class = "flex align-items-center justify-content-center  font-bold text-gray-900 m-2 px-5 py-3 border-round">
      <span className="p-float-label">
              <InputText id="username" value={value2} onChange={(e) => setValue2(e.target.value)} />
              <label htmlFor="username">Usuario</label>
      </span>
    </div>
  )
}
