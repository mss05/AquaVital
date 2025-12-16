const app = {
    state: {
        userName: "",
        entries: 0,
        isScannerRunning: false,
        qrScanner: null
    },

    // Ekranlar Arası Geçiş (SPA Mantığı)
    navigateTo: (screenId) => {
        if (app.state.qrScanner && screenId !== 'screen-scan') {
            app.state.qrScanner.stop().catch(e => console.log(e));
        }
        document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
        document.getElementById(screenId).style.display = 'flex';
        
        if (screenId === 'screen-scan') app.initScanner();
    },

    // Kayıt İşlemi (CRM Verisi Toplama)
    handleRegistration: () => {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;

        if (name && email && phone) {
            app.state.userName = name;
            document.getElementById('user-greeting').innerText = `Welcome, ${name.split(' ')[0]}!`;
            // Veri Kaydetme Simülasyonu
            app.navigateTo('screen-dash');
            app.startAICoach();
        } else {
            alert("Please complete the form to join the tournament!");
        }
    },

    // Gerçek Kamera QR Tarayıcı Entegrasyonu
    initScanner: () => {
        app.state.qrScanner = new Html5Qrcode("qr-reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        app.state.qrScanner.start(
            { facingMode: "environment" }, 
            config, 
            (decodedText) => {
                app.processCode(decodedText);
            }
        ).catch(err => {
            alert("Camera Permission Required!");
            app.navigateTo('screen-dash');
        });
    },

    // Kod Doğrulama (Kazandirio Mantığı)
    submitManualCode: () => {
        const code = document.getElementById('manual-code-input').value;
        if (code.length === 10) {
            app.processCode(code);
        } else {
            alert("Enter a valid 10-digit cap code.");
        }
    },

    processCode: (code) => {
        // Kod İşleme
        app.state.entries++;
        document.getElementById('entry-count').innerText = app.state.entries;
        alert("GOAL! 1 Ticket Added to Your Wallet! 🇧🇷");
        app.navigateTo('screen-dash');
    },

    // AI Hidrasyon Koçu (Gerçek Zamanlı Simülasyon)
    startAICoach: () => {
        const temp = 34; // Simüle edilen Brezilya sıcaklığı
        const advice = document.getElementById('ai-advice');
        setTimeout(() => {
            advice.innerText = `It's ${temp}°C in São Paulo! Drink 600ml AquaVital to balance electrolytes.`;
        }, 1500);
    }
};

// İlk Ekranı Başlat
window.onload = () => app.navigateTo('screen-auth');
