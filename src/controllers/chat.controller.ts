export const registerMessageHandler = (io: any, socket: any) => {
  const sendMessage = async (payload: any) => {
    io.emit('message:send', payload);
  };
  socket.on('message:send', sendMessage);
};
