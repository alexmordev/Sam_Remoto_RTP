import React, { useState } from 'react'

const GetCounters = async() => {
    const [products, setProducts] = useState([]);
    const token = JSON.parse( localStorage.getItem( 'token' ));
    const url = `${process.env.REACT_APP_DOMINIO}/api/consultaContador`;

        const resp = await fetch(url, {
            method: 'get',
            headers: new Headers ({
                'Authorization': `jwt ${token}`,
                
            })
        });
    const result = await resp.json();
    console.log('El result: ', result)
    return result
}

export default GetCounters