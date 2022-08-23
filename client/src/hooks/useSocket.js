import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {

    const socket = useMemo(() => io.connect( serverPath, {
        transports: ['websocket']
    }), [ serverPath ]);
    const [online, setOnline] = useState(false);

    // useEffect(() => {
    //   setOnline( socket.connected );
    // }, [ socket ]);

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         setOnline( true );
    //     })
    // }, [ socket ]);
    
    // useEffect(() => {
    //     socket.on('disconnect', () => {
    //         setOnline( false );
    //     })
    // }, [ socket ]);

      useEffect(() => {
        socket.on('status-device', (device) =>{
            setOnline(true);
            // console.log(device);
        })
    }, [socket]);
    
    return {
        socket
        // online
    }
}