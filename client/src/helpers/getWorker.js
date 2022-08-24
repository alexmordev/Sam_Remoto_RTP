

export const getWorker = async(param) => {
    
    const url = `${process.env.REACT_APP_WORKER_DOMINIO}/api/get_card/${param}`;

    try {

        const resp = await fetch(url);
        const result = await resp.json();
        return result[0];
        
    } catch (error) {
        return '0';    
    }

}
