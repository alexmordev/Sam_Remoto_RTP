// const GetRequest = async(url)=>{
//     const res = await fetch(url)
//     if(!res)
//       throw new Error("WARN", res.status);
//     const data = await res.json();
//     return data;
// }
// module.exports = GetRequest;



const GetRequest = async(url)=>{
  try {
    const res = await fetch(url)
    const data = await res.json();
    return data;
  } catch (error) {
    throw error
  }
}
module.exports = GetRequest;