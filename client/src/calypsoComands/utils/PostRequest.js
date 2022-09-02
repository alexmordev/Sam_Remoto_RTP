const token = JSON.parse( localStorage.getItem( 'token' ));

const PostRequest = async(url,object)=>{
    try{
        const res = await fetch(url,{
            method:'POST',
            body:JSON.stringify(object),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': `jwt ${token}`
            })
        })
        if(!res)
            throw new Error("WARN", res.status);
        const data = await res.json();
        return data;
    }catch(err){
        throw err;
    }
}

module.exports = PostRequest;