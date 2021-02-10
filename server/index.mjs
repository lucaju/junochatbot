import app from './server.mjs';
import chalk from 'chalk';
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    chalk.bgGreen.black(`\n Juno Chatbot listening on port ${port}! \n`)
  );
});
