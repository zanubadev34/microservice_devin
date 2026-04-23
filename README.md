================================================================================
VERSI 1
================================================================================

"Dalam Pengerjaan UTS Microservices: Dari Nol Hingga Berhasil"

Perjalanan saya mengerjakan UTS Microservices dimulai dari mempersiapkan senjata utama yaitu Laragon sebagai rumah bagi server lokal dan ActiveMQ Classic yang berperan sebagai posko komunikasi antar service. Setelah mengunduh dan mengekstrak ActiveMQ di folder C:\activemq, saya menjalankannya melalui command prompt dan memastikan dashboard-nya bisa diakses di localhost:8161 dengan login admin. Selanjutnya saya membangun dua service menggunakan Node.js. Service pertama bernama Producer yang saya desain dengan framework Express lengkap dengan form pendaftaran yang menerima input nama, email, dan prodi. Ketika tombol daftar ditekan, alih-alih mengirim email langsung, saya menyuruhnya mengirimkan pesan berbentuk JSON ke antrian bernama registration_queue di ActiveMQ, kemudian langsung memberikan jawaban cepat ke pengguna bahwa pendaftaran sedang diproses. Service kedua bernama Consumer yang saya buat sebagai pekerja setia yang berjalan terus-menerus di terminal, menggunakan library STOMP.js untuk menguping queue yang sama, dan setiap kali ada pesan masuk ia akan berpura-pura mengirim email dengan mencetak log ke layar terminal. Babak pengujian menjadi momen paling seru. Pertama saya coba kondisi normal dan semuanya berjalan mulus. Lalu saya matikan Consumer dan melakukan pendaftaran sebanyak 5 kali. Hasilnya pesan-pesan itu mengantri dengan sabar di ActiveMQ yang terlihat jelas di dashboard bagian Number of Pending Messages. Kemudian saya hidupkan kembali Consumer dan ajaibnya kelima pesan itu langsung diproses satu per satu secara otomatis tanpa ada yang terlewat! Setelah puas dengan fungsionalitas, saya poles tampilan front-end menjadi lebih cantik dengan gradien warna ungu, animasi latar belakang yang bergerak lembut, ikon-ikon di setiap kolom input, serta efek loading saat tombol ditekan. Akhirnya sebagai bukti pertanggungjawaban, saya unggah seluruh kode ke GitHub dengan nama repository microservice-uts, lengkapi dengan README yang berisi panduan dan screenshot, serta rekam video demonstrasi singkat berdurasi 3 menit untuk menunjukkan keajaiban message queue ini bekerja.


================================================================================
VERSI 2 
================================================================================

"Implementasi Arsitektur Message Queue pada Sistem Notifikasi UMUKA"

Langkah implementasi sistem notifikasi asinkron ini mengikuti alur kerja standar message queue architecture yang terdiri dari empat fase utama.

Fase pertama environment preparation mencakup instalasi Laragon sebagai web server foundation, deployment ActiveMQ Classic 5.18.6 pada direktori C:\activemq dengan konfigurasi transport connectors yang mengaktifkan STOMP protocol di port 61613 dan WebSocket di port 61614, serta instalasi Node.js runtime untuk mengeksekusi kedua service.

Fase kedua pengembangan Service Producer (User Registration) menggunakan framework Express.js dengan endpoint POST /api/register yang menerima payload {name, email, prodi}. Handler endpoint tidak melakukan pemrosesan email secara sinkron melainkan memanggil method publish() dari library @stomp/stompjs untuk mengirim pesan JSON ke destination /queue/registration_queue, kemudian mengembalikan HTTP response 200 dengan pesan konfirmasi cepat ke client.

Fase ketiga pengembangan Service Consumer (Notification Worker) menggunakan STOMP client yang melakukan subscribe ke queue yang sama, dengan callback function yang melakukan parsing JSON payload dan mensimulasikan pengiriman email melalui console.log statement setelah delay 1 detik.

Fase keempat pengujian kualitatif meliputi tiga skenario: (1) baseline testing dengan kedua service aktif memverifikasi end-to-end message flow, (2) asynchronous testing dengan menghentikan consumer kemudian mengirim 5 request registrasi untuk membuktikan message persistence di broker queue, (3) resilience testing dengan merestart consumer untuk mengamankan automatic message consumption dari antrian.

Tahap final mencakup front-end enhancement dengan HTML/CSS modern yang menampilkan gradient background, animasi floating circles, ikon Font Awesome, live validation, dan loading spinner. Dokumentasi berupa screenshot dashboard ActiveMQ pada setiap kondisi, pembuatan video demo berdurasi 3 menit, serta deployment kode sumber ke GitHub repository public disertai README.md yang komprehensif.


================================================================================
VERSI 3 (Gaya Santai & Gaul - Anak IT)
========================================================================

"Gue Kasih Tau Cara Bikin Notifikasi Pakai Antrian ala ActiveMQ"

Oke jadi gini ceritanya, gue dapet tugas UTS Microservices suruh bikin sistem pendaftaran yang notifikasinya pakai message queue. Pertama-tama gue set up dulu environment-nya. Install Laragon biar ada server lokal. Terus download ActiveMQ Classic trus extract di C:\activemq. Jalanin lewat cmd, trus cek dashboardnya di localhost:8161 pake login admin:admin, aman dah.

Abis itu gue bikin dua service pake Node.js. Service pertama namanya Producer, gue pake Express, bikin form isian nama, email, prodi. Nah pas data dikirim, gue ga kirim email langsung ya, tapi gue kirim pesan JSON ke queue registration_queue di ActiveMQ. Trus gue kasih respon ke user "Pendaftaran sedang diproses" biar mereka ga nunggu lama. Service kedua namanya Consumer, ini tuh kayak kuli yang kerja di belakang layar. Jalan terus di terminal, pake library STOMP.js buat nguping queue tadi. Pas ada pesan masuk langsung dia print "Mengirim email verifikasi ke..." di terminal, pura-pura ngirim email gitu deh.

Nah bagian serunya pas testing. Gue matiin dulu si Consumer, terus gue daftarin 5 user lewat form. Cek dashboard ActiveMQ ternyata antriannya nambah jadi 5 tuh pending messages, keren kan? Terus gue hidupin lagi si Consumer, secara otomatis kelima pesan tadi langsung diproses semua, ga ada yang ilang!

Gue juga bikin tampilan front-endnya biar kece pake gradien ungu, animasi floating circles, ikon-ikon keren pake Font Awesome, live validation biar error langsung ketahuan, loading spinner biar ga kelamaan nunggu. Pokoknya aesthetic banget lah, kayak startup gitu tampilannya.

Terakhir gue push semua kode ke GitHub, bikin README yang jelas dan lengkap, rekam video demo 3 menit, beres deh tugas UTS siap dikumpulin. Gaskeun!


================================================================================
VERSI 4 (Gaya Puitis & Reflektif)
================================================================================

"Symphony of Queues: Ketika Pesan Menari dalam Antrian"

Dalam sunyi malam yang ditemani cahaya layar monitor, saya memulai orkestrasi sistem microservices ini dengan mengundang ActiveMQ sebagai konduktor yang bijaksana. Ia duduk manis di port 61614 mendengarkan setiap bisik pesan yang akan lewat. Laragon saya bangun sebagai panggung tempat para service berdansa, sementara Node.js menjadi bahasa universal yang membuat mereka saling mengerti.

Producer, sang pengirim kabar, saya rupaikan menjadi sebuah form sederhana yang ramah. Ia menerima suara-suara dari pengguna berupa nama, email, dan prodi, lalu dengan lembut membungkusnya dalam balutan JSON sebelum berbisik ke telinga ActiveMQ: "Tolong sampaikan pesan ini ke registration_queue." Tanpa menunggu jawaban, Producer langsung tersenyum kepada pengguna, "Pendaftaran sedang diproses," katanya, karena ia tahu kecepatan adalah pelayanan.

Di sudut lain, Consumer duduk tenang seperti penjaga mercusuar. Matanya tak pernah terpejam, ia terus memandang jauh ke ujung queue, menanti-nanti kedatangan pesan-pesan baru. Ketika Consumer jatuh tertidur (sengaja saya matikan), lima pesan datang berturut-turut. Namun mereka tidak panik. Mereka hanya berbaris rapi di queue, sabar menunggu giliran, seperti pasien di ruang tunggu yang percaya pada dokter.

Lalu saya bangunkan Consumer dari tidurnya. Betapa indahnya melihat kelima pesan itu terproses satu per satu, seperti embun pagi yang jatuh bergantian dari dedaunan. Semuanya tersampaikan, tidak ada yang terlewat.

Tampilan depan pun saya hias dengan gradien langit senja di kota ungu. Animasi lingkaran-lingkaran yang berenang lembut, dan ikon-ikon yang tersenyum ramah pada setiap kolom yang disentuh pengguna. Live validation menjadi sentuhan akhir yang membuat pengguna merasa diperhatikan.

Kini semua cerita ini saya abadikan dalam kode-kode yang mengalir deras ke GitHub. Saya bingkai dengan README yang jujur dan lengkap. Saya rekam dalam video tiga menit sebagai saksi bisu bahwa di balik antrian, ada keajaiban sinkronisasi yang menunggu untuk ditemukan.



link drive : 

================================================================================
