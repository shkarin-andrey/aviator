import { useEffect, useState } from 'react';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export const useSocketio = (url: string, options?: Partial<ManagerOptions & SocketOptions>) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(url, options);

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, []);

  return socket;
};
