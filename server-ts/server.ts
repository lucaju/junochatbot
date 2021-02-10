import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import user from './routers/user';
import story from './routers/story';

const __filename:string = fileURLToPath(import.meta.url);
const __dirname:string = path.dirname(__filename);
const publicPath:string = path.join(__dirname, '..', 'dist');
const app:Express = express();

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies

// dev tools
// const loadDevTools = async () => {
//   const { devTools } = await import('./dev/dev');
//   devTools(app);
// };

// if (process.env.NODE_ENV === 'development') loadDevTools();

app.use('/user', user);
app.use('/story', story);

// static
app.use(express.static('./dist'));

// catch all
// * turno off on dev. reason HMR doesn't work with this on.
// if (process.env.NODE_ENV !== 'development') {
app.get('*', (req:Request, res:Response) => {
  // console.log('catch all');
  // res.set('Content-Type', 'text/event-stream');
  res.status(200).sendFile(path.join(publicPath, 'index.html'));
});
// }

// error
// app.use((req, res) => res.status(404).send('404: Page not Found'));
// app.use((error, req, res) => res.status(500).send('500: Internal Server Error'));

export default app;
