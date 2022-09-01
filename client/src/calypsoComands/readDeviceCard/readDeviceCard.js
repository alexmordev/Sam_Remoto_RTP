import GetRequest from "../utils/GetRequest";

export const readDeviceCard = async() => {
    // console.log('Petición al selectApp disparo')
    const applicationSN = await GetRequest("/selectApp");
    // console.log(applicationSN)
    return applicationSN;

}
