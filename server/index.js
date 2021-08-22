import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.get('/responses', (req, res) => {
  let responses;
  try {
    let fileData = fs.readFileSync('responses.json');
    fileData = JSON.parse(fileData);
    responses = JSON.stringify(fileData, null, 4);
    return res.send(`<pre><code>${responses}</code></pre>`);
  } catch (err) {
    console.log(err);
    return res.status(500).send('something went wrong!');
  }
});

app.post('/contact', (req, res) => {
  console.log(req.body);

  const file = 'responses.json';
  // save form response to json file
  fs.readFile(file, (err, data) => {
    if (err && err.code === 'ENOENT') {
      return fs.writeFile(
        file,
        JSON.stringify([res.body]),
        (error) => console.error
      );
    } else if (err) {
      // Some other error
      console.error(err);
    }
    // 2. Otherwise, get its JSON content
    else {
      try {
        const fileData = JSON.parse(data);
        console.log('file data-->', fileData);

        // 3. Append the object you want
        fileData.push(req.body);

        //4. Write the file back out
        return fs.writeFile(
          file,
          JSON.stringify(fileData),
          (error) => console.error
        );
      } catch (exception) {
        console.error(exception);
      }
    }
  });
  return res.status(200).json({
    message: "Thank you for contacting me. I'll get back to you shortly!",
  });
});

app.use(express.static('./build'));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server is listening on port ${PORT}`);
});
