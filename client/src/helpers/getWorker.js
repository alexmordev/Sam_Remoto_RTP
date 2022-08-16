

export const getWorker = async(param) => {

    console.log('El param es: ', param)
    const url = `${process.env.REACT_APP_WORKER_DOMINIO}/api/get_card/${param}`;
    const resp = await fetch(url);
    const result = await resp.json();
    console.log('El resultado es: ', result[0]);
    // console.log('El resultado es: ', result[0].error);
    return result[0];

}
