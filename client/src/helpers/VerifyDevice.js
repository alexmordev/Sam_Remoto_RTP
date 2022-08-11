import GetRequest from "../calypsoComands/utils/GetRequest";


export const VerifyDevice = async() => {

    try {
          const DeviceCheck = await GetRequest("/api/checkDevice");
          return DeviceCheck.status;
        
    } catch (error) {
        return error;
    }

}
