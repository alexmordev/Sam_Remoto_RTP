// Metodo POST
// Servidor remoto


const cardCipherPinUpdate = async(url, object) => {

  const res = await fetch(url,{
    method:'POST',
    body:JSON.stringify(object),
    headers:{
      'Content-Type': 'application/json'
  }
  })
  if(!res)
    throw new Error("WARN", res.status);
  const {response} = await res.json();
  const {Response} = response;
  // console.log(Response.slice(0,-4))
  return Response.slice(0,-4);
  
}

export default cardCipherPinUpdate