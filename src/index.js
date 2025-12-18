const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({});

const PORT = process.env.PORT; // untuk mendapatkan port dari variabel lingkungan

app.get('/api', (req, res) => {
    res.send("selmat datang diAPI!");
    
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
