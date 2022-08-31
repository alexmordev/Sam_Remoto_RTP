import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {

    const socket = useMemo(() => io.connect( serverPath, {
        transports: ['websocket']
    }), [ serverPath ]);
    // const [online, setOnline] = useState(false);

    //   useEffect(() => {
    //     socket.on('status-card', (device) =>{
    //         setOnline(true);
    //         // console.log(device);
    //     })
    // }, [socket]);
    
    //   useEffect(() => {
    //     socket.on('status-device', (device) =>{
    //         setOnline(true);
    //         // console.log(device);
    //     })
    // }, [socket]);
    
    return {
        socket
        // online
    }
}