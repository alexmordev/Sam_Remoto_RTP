// Metodo GET
// Servidor Local


const selectAplication = async( url ) => {

  const SendRequest = async()=>{
    const res = await fetch( url )
    if(!res)
      throw new Error("WARN", res.status);
    const {serialNumber} = await res.json();
    return serialNumber;
  }

    const SNumber = await SendRequest('/selectApp');
    return SNumber 

}

export default selectAplication
