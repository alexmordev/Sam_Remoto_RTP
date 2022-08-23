

export const getAuthorization = async() => {

  const token = JSON.parse( localStorage.getItem( 'token' ));
    const url = `${process.env.REACT_APP_DOMINIO}/api/consultaContador`;
        
        const resp = await fetch(url, {
            method: 'get',
            headers: new Headers ({
                'Authorization': `jwt ${token}`
            })
        });
        const result = await resp.json();
        return result;
        // console.log(result)
        // const success = result.Tabla_Sam 
        // if (success) {
        //   return true
        // } else {
        //   return false
        // }

}



