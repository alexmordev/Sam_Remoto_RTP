const PostRequest = async(url,object)=>{
const res = await fetch(url,{
    method:'POST',
    body:JSON.stringify(object),
    headers:{
    'Content-Type': 'application/json'
}
})
if(!res)
    throw new Error("WARN", res.status);
const data = await res.json();
return data;
}

module.exports = PostRequest;