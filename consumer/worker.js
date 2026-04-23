const Stomp = require('@stomp/stompjs');

console.log('═══════════════════════════════════════════════════════════');
console.log('🔄 MEMULAI WORKER NOTIFICATION (Service 2)');
console.log('📡 Menunggu pesan dari ActiveMQ...');
console.log('═══════════════════════════════════════════════════════════\n');

// Setup STOMP Client
const stompClient = new Stomp.Client({
    brokerURL: 'ws://localhost:61614',
    connectHeaders: {
        login: 'admin',
        passcode: 'admin',
    },
    debug: function (str) {
        // Nonaktifkan debug untuk tampilan lebih bersih
        // console.log('STOMP:', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

// Handler saat menerima pesan
function handleMessage(message) {
    try {
        const user = JSON.parse(message.body);
        
        console.log('\n' + '─'.repeat(60));
        console.log(`📧 [LOG] Mengirim email verifikasi ke: ${user.email}...`);
        
        // Simulasi proses pengiriman email (delay 1 detik)
        setTimeout(() => {
            console.log(`✅ [LOG] Berhasil! User ${user.name} dari prodi ${user.prodi} telah terdaftar.`);
            console.log(`🕐 Waktu pendaftaran: ${user.registeredAt}`);
            console.log('─'.repeat(60) + '\n');
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error memproses pesan:', error.message);
    }
}

// Koneksi ke ActiveMQ
stompClient.onConnect = function(frame) {
    console.log('✅ Worker terhubung ke ActiveMQ!');
    console.log('👂 Mendengarkan queue: registration_queue');
    console.log('💡 Worker siap memproses pesan\n');
    
    // Subscribe ke queue
    stompClient.subscribe('/queue/registration_queue', (message) => {
        handleMessage(message);
    });
};

stompClient.onStompError = function(frame) {
    console.error('❌ STOMP Error:', frame.headers['message']);
};

stompClient.onWebSocketError = function(event) {
    console.error('❌ WebSocket Error:', event);
};

// Aktifkan koneksi
stompClient.activate();

// Handle shutdown gracefully
process.on('SIGINT', () => {
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('⏹️ Mematikan worker...');
    console.log('═══════════════════════════════════════════════════════════');
    stompClient.deactivate();
    process.exit(0);
});