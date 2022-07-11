
export const getDumps = () => {
    
    const urlDumps = 'https://api.chucknorris.io/jokes/random';

    // fetch(urlDumps).then( resp => {
    //     resp.json().then( data => {
    //         console.log(data);
    //         return data;
    //     } )
    // } ).catch(err => {
    //     console.log( err );
    // } );

    fetch (urlDumps)
        .then( resp => resp.json())
        .then( data => {
            console.log(data)
        } );
}


