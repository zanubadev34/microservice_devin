const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Stomp = require('@stomp/stompjs');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('views'));

// Setup STOMP Client ke ActiveMQ (menggunakan WebSocket)
const stompClient = new Stomp.Client({
    brokerURL: 'ws://localhost:61614',  // WebSocket port ActiveMQ
    connectHeaders: {
        login: 'admin',
        passcode: 'admin',
    },
    debug: function (str) {
        console.log('STOMP:', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

let connected = false;

stompClient.onConnect = function(frame) {
    connected = true;
    console.log('✅ Terhubung ke ActiveMQ!');
    console.log('📤 Siap mengirim pesan ke queue: registration_queue');
};

stompClient.onStompError = function(frame) {
    console.error('❌ STOMP Error:', frame.headers['message']);
};

stompClient.activate();

// Fungsi kirim pesan ke Queue
function sendToQueue(userData) {
    if (!connected) {
        console.log('⏳ Menunggu koneksi ActiveMQ...');
        setTimeout(() => sendToQueue(userData), 1000);
        return;
    }

    const message = JSON.stringify(userData);
    stompClient.publish({
        destination: '/queue/registration_queue',
        body: message,
        headers: { 'persistent': 'true' }
    });
    
    console.log(`📤 Pesan dikirim ke queue: ${userData.email} - ${userData.name}`);
}

// Route: Halaman Form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// API: Endpoint Pendaftaran
app.post('/api/register', (req, res) => {
    const { name, email, prodi } = req.body;
    
    if (!name || !email || !prodi) {
        return res.status(400).json({ error: 'Semua field harus diisi!' });
    }
    
    const userData = { 
        name, 
        email, 
        prodi, 
        registeredAt: new Date().toISOString() 
    };
    
    // Kirim ke ActiveMQ (bukan langsung kirim email)
    sendToQueue(userData);
    
    // Respon cepat ke user
    res.json({ 
        message: 'Pendaftaran sedang diproses, silakan cek email secara berkala.',
        user: { name, email, prodi }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Producer (Service 1) berjalan di http://localhost:${PORT}`);
    console.log(`📋 Buka browser dan akses form pendaftaran`);
});