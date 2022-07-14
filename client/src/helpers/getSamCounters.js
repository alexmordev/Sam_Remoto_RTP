
export const getSamCounters = () => {
    
    const urlSamCounters = 'https://api.chucknorris.io/jokes/random';

    // fetch(urlSamCounters)
    //     .then( resp => resp.json() )
    //     .then( data => {
    //         // console.log( data );
    //         return  data ;
    //     } );

    const token = JSON.parse( localStorage.getItem( 'token' ));
    const url = "http://dev-node.rtp.gob.mx:5000/api/consultaSams";

    const peticion = async() => {
        const resp = await fetch(url, {
            method: 'get',
            headers: new Headers ({
                'Authorization': `jwt ${token}`
            })
        });
        const result = await resp.json();
        console.log(result);
    };

    

    peticion();
};