// Metodo POST
// Servidor Remoto


const diversifier = async( url, object ) => {

    const res = await fetch(url,{
      method:'POST',
      body:JSON.stringify(object),
      headers:{
        'Content-Type': 'application/json'
    }
    })
    if(!res)
      throw new Error("WARN", res.status);
    const {SelectDiversifier} = await res.json();
    return SelectDiversifier.Status;
}

export default diversifier


