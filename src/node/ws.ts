/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import { Server } from 'http';
import ws from 'ws';

class wsdev {
  public wsServer: ws.Server;

  public wsActive: boolean = false;

  public WS: ws;

  constructor(server: Server) {
    this.wsServer = new ws.Server({ server });
    this.wsServer.on('connection', (ws: ws) => {
      this.wsActive = true;
      this.WS = ws;
    });
  }

  _destroy() {
    if (this.wsActive) this.WS.close();
  }

  _send(channel: string, data: string): void {
    if (this.wsActive) this.WS.send(JSON.stringify({ channel, data }));
  }
}

export default wsdev;
