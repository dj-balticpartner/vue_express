const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

// items
const items = require('./routes/api/posts')
app.use('/api/posts', items);






// run the server
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
