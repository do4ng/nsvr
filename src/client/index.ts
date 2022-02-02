import { CustomMessageHandle, MessageHandle } from './client';

const ws = new WebSocket('ws://localhost:3000');

let checkconnectiontimer;
let ischeckconnection = false;

let ping: number = 0;

// init nsvr element

const nsvrElement = document.createElement('div');
nsvrElement.id = 'nsvr';

window.addEventListener('load', () => {
  document.body.appendChild(nsvrElement);
});

ws.onopen = () => {
  ws.send(JSON.stringify({ channel: 'requestconnect', data: '{}' }));
  console.log('[server] connecting..');
  setInterval(() => {
    ws.send(JSON.stringify({ channel: 'ping', data: '{}' }));
    checkconnectiontimer = performance.now();
    ischeckconnection = true;
  }, 2000);
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const channel = data.channel || '';
  const message = data.data || '';

  if (channel === 'custom') {
    CustomMessageHandle(message);
  } else if (channel === 'pong') {
    if (ischeckconnection) {
      ping = performance.now() - checkconnectiontimer;
      // console.log(`[server] ping: ${ping.toFixed(1)}ms`);
      ischeckconnection = false;
      nsvrElement.innerHTML = `<div id="nsvr-ping">${ping.toFixed(1)}ms</div>`;
    }
  } else {
    MessageHandle(channel);
  }
};
