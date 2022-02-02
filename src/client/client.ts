/* eslint-disable no-unused-expressions */
export function MessageHandle(channel: string): void {
  switch (channel) {
    case 'reload':
      window.location.reload();
      break;

    case 'connect':
      console.log('[server] connected');
      break;

    case 'disconnect':
      console.log('[server] disconnected');
      break;

    default:
      break;
  }
}

export function CustomMessageHandle(message: string): void {
  console.log(message);
}
