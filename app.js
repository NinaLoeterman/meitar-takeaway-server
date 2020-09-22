const express = require('express');
const app = express();
const cors = require('cors');


const port = 5050

app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })