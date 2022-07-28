import React from 'react';

export const Footer = () => {

  const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%"
  };
  
    return (      
      <div style={style}>El uso indebido de este software puede representar un delito
            y es responsabilidad completa del usuario que lo lleve a cabo. 
            En caso de tener dudas sobre sus funciones favor de contactar
            al equipo de desarrollo de RTP</div>
      
    );
  

  
};


