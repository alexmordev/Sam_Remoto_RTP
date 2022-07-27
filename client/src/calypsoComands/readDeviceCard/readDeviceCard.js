import GetRequest from "../utils/GetRequest";

export const readDeviceCard = async() => {
    
    const applicationSN = await GetRequest("/selectApp");
    return applicationSN;

}
