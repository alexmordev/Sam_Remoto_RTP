const GetRequest = async(url)=>{
  try{
    const res = await fetch(url)
    if(!res)
      throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
}
  catch(err){
    throw err
  }
}
module.exports = GetRequest;