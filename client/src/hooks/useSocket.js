import { memo, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {

    const socket = useMemo(() => io.connect( serverPath, {
        transports: ['websocket']
    }), [ serverPath ]);
    
    return {
        socket
    }
}