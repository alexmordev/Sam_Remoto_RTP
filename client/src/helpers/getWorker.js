

export const getWorker = async(param) => {

    console.log(process.env)
    
    // const url = `${process.env.REACT_APP_WORKER_DOMINIO}/api/get_card/${param}`;
    const url = `http://app.rtp.gob.mx/api/get_card/${param}`;

    const resp = await fetch(url);
    const result = await resp.json();

    return result[0];


}
