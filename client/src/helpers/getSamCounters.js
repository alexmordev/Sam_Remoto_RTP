
export const getSamCounters = () => {
    
    
    const urlSamCounters = 'https://api.chucknorris.io/jokes/random';

    // fetch(urlSamCounters).then( resp => {
    //     resp.json().then( data => {
    //         console.log(data);
    //     } )
    // } );

    fetch(urlSamCounters)
        .then( resp => resp.json() )
        .then( data => {
            console.log( data );
        } );
};