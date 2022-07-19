//Metodo POST
// Servidor remoto


const giveRandom = async( url, object ) => {

  const res = await fetch(url,{
    method:'POST',
    body:JSON.stringify(object),
    headers:{
      'Content-Type': 'application/json'
  }
  })
  if(!res)
    throw new Error("WARN", res.status);
  const {GiveRandom} = await res.json();
  return GiveRandom.Status;

}

export default giveRandom