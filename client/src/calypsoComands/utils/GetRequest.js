const GetRequest = async(url)=>{
    const res = await fetch(url)
    if(!res)
      throw new Error("WARN", res.status);
    const data = await res.json();
    return data;
}
module.exports = GetRequest;