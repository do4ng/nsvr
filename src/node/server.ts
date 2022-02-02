/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-new */
// eslint-disable-next-line object-curly-newline
import { existsSync, readFileSync } from 'fs';
import { createServer } from 'http';
import path from 'path';
import 'colors';
import chokidar from 'chokidar';
import jsdom from 'jsdom';
import { Config } from '../../@types';
import wsdev from './ws';
import CompileCode from './compile';

const cwd = process.cwd();

function CreateServer(config?: Config): void {
  const port = config?.port || 3000;
  const index = config?.index.main || 'index.html';

  const server = createServer((req, res) => {
    const compile = (e?) => {
      const compiled = CompileCode(
        `${req.url}${e ? `.${e}` : ''}`,
        readFileSync(path.join(cwd, `${req.url}${e ? `.${e}` : ''}`)).toString()
      );

      res.setHeader('Content-Type', compiled.type);
      res.end(compiled.code);
    };
    if (req.url.startsWith('/@nsvr/')) {
      const url = req.url.replace('/@nsvr/', '');

      // client code
      if (url === 'client.js') {
        res.setHeader('Content-Type', 'application/javascript');
        res.end(readFileSync(path.join(__dirname, '../dist/client.js')));
      }
    } else if (existsSync(path.join(cwd, req.url)) && req.url !== '/') {
      compile();
    } else if (existsSync(path.join(cwd, `${req.url}.js`)) && req.url !== '/') {
      compile('js');
    } else if (existsSync(path.join(cwd, `${req.url}.ts`)) && req.url !== '/') {
      compile('ts');
    } else {
      res.setHeader('Content-Type', 'text/html');
      const html = new jsdom.JSDOM(readFileSync(path.resolve(process.cwd(), index)).toString());

      html.window.document.querySelector('head').innerHTML = `<script src="/@nsvr/client.js"></script>${
        html.window.document.querySelector('head').innerHTML
      }`;

      res.end(html.window.document.documentElement.outerHTML, 'utf-8');
    }
  }).listen(port);

  const wss = new wsdev(server);

  wss.wsServer.on('connection', () => {
    wss.WS.on('message', (data) => {
      const dataObj = JSON.parse(data.toString());
      if (dataObj.channel === 'requestconnect') {
        wss._send('connect', 'success');
      } else if (dataObj.channel === 'ping') {
        wss._send('pong', '');
      }
    });
  });

  console.log(`Server Running on port ${port}`.green);

  chokidar.watch(path.resolve(process.cwd(), './src')).on('change', () => {
    wss._send('reload', 'reload');
  });
  chokidar.watch(path.resolve(process.cwd(), index)).on('change', () => {
    wss._send('reload', 'reload');
  });
}

export { CreateServer };
