import path from 'path';
import express from 'express';
import youtube from './routes/youtube';

const publicPath = path.join(__dirname, '..', 'dist');
const app = express();

app.use(express.json({ limit: '5mb' })); // support json encoded bodies

// dev tools
const loadDevTools = async () => {
  const { devTools } = await import('./dev/dev');
  devTools(app);
};

if (process.env.NODE_ENV === 'development') loadDevTools();

app.use('/youtube', youtube);

// static
app.use('/uploads', express.static('./uploads'));
app.use(express.static(publicPath));

// catch all
// * turno off on dev. reason HMR doesn't work with this on.
// if (process.env.NODE_ENV !== 'development') {
app.get('*', (req, res) => {
  // console.log('catch all');
  // res.set('Content-Type', 'text/event-stream');
  res.status(200).sendFile(path.join(publicPath, 'index.html'));
});

// app.use('*', express.static(path.join(publicPath, 'index.html')));

// error
// app.use((req, res) => res.status(404).send('404: Page not Found'));
// app.use((error, req, res) => res.status(500).send('500: Internal Server Error'));

export default app;
