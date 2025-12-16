const app = {
    scanner: null,
    isScanning: false, // Kamera durumunu takip eder
    user: { name: "Guest", entries: 0 },

    // Ekran Değiştirici
    showScreen: (id) => {
        document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    // 1. GİRİŞ
    login: () => {
        const name = document.getElementById('user-name').value;
        if(name) {
            app.user.name = name;
            document.getElementById('display-name').innerText = name;
            app.showScreen('view-dash');
            app.startAI();
        } else {
            alert("Please enter your name!");
        }
    },

    // 2. KAMERA BAŞLAT (Güvenli)
    startScanner: () => {
        app.showScreen('view-scan');
        
        // Eğer zaten açıksa tekrar başlatma
        if(app.isScanning) return;

        app.scanner = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        app.scanner.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                app.handleSuccess(decodedText);
            },
            (err) => { /* Hata loglamasını kapattık */ }
        ).then(() => {
            app.isScanning = true;
        }).catch(err => {
            console.error("Kamera Hatası:", err);
            alert("Kamera açılamadı! Lütfen HTTPS veya Localhost kullanın.");
            app.stopScanner();
        });
    },

    // 3. KAMERA DURDUR (Async/Await - Çökme Önleyici)
    stopScanner: async () => {
        if(app.scanner && app.isScanning) {
            try {
                await app.scanner.stop();
                app.scanner.clear();
                app.isScanning = false;
            } catch (err) {
                console.log("Durdurma hatası:", err);
            }
        }
        app.showScreen('view-dash');
    },

    // 4. BAŞARI SENARYOSU
    handleSuccess: (code) => {
        // Önce kamerayı güvenli kapat, sonra alert ver
        app.stopScanner().then(() => {
            app.user.entries++;
            document.getElementById('ticket-count').innerText = app.user.entries;
            alert(`SUCCESS! Code Verified: ${code}\n1 Entry Added! 🇧🇷`);
        });
    },

    // 5. MANUEL GİRİŞ
    openManual: () => app.showScreen('view-manual'),
    goHome: () => app.showScreen('view-dash'),

    verifyCode: () => {
        const code = document.getElementById('manual-code').value;
        if(code.length === 10) {
            app.handleSuccess(code);
            app.goHome();
        } else {
            alert("Invalid Code (Must be 10 digits)");
        }
    },

    // AI SİMÜLASYONU
    startAI: () => {
        setTimeout(() => {
            document.getElementById('ai-text').innerText = "São Paulo: 34°C - Drink 500ml!";
            document.querySelector('.status-light').style.background = "#009739"; // Yeşil
        }, 2000);
    }
};
