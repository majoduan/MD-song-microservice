const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const songRoutes = require('./routes/songRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/songs', songRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});