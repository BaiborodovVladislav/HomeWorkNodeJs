const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/user');

app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
