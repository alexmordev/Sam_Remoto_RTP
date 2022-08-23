const token = JSON.parse( localStorage.getItem( 'token' ));

const MakeRequest = async(url, object)=>{
    // console.log(url);
    const res = await fetch(url,{
        method:"POST",
        body:JSON.stringify(object),
        // headers: new Headers ({
        //     'Authorization': `jwt ${token}`
        // })
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(!res)
        throw new Error("WARN", res.status);
    const data = await res.json();
    // console.log(token);
    return data;
}
    
module.exports = MakeRequest;

    /**
     *   let res;
    if(object === ""){
        res = await fetch(url,{
            method:method,
            headers: new Headers ({
                'Authorization': `jwt ${token}`
            })
        })
    }else{
        res = await fetch(url,{
            method:method,
            body:JSON.stringify(object),
            headers:{
                'Content-Type': 'application/json'
            }
        })
    }
     */