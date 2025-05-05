const express = require('express');
const cors = require('cors');
const prisma = require('./prisma/client');
const bodyParser = require('body-parser');
const translate = require('./routes/translate');
const optimize = require('./routes/optimize');
//const infer = require('./routes/infer');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://localhost:5176',
        'http://localhost:5177',
        'http://localhost:5178',
        'http://localhost:5179',
    ],

    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(bodyParser.json());

app.use('/api', translate);
app.use('/api', optimize);
//app.use('/api', infer);

app.use((err, req, res, next) => { 
    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred on the server.' :err.message
    });
});

const PORT = process.env.PORT || 6500;

const startServer = async () => {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
            console.log(`📝 Health check available at http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
