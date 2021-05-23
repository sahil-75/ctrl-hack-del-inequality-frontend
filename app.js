const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './build/index.html'));
});

// start server
const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
	console.log('Server listening on port ' + port);
});
