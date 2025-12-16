const app = {
    scanner: null, // Kamera nesnesi
    user: { name: "", entries: 0 },

    // Ekran Değiştirme Fonksiyonu
    showView: (viewId) => {
        document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
        document.getElementById(viewId).classList.add('active');
    },

    // 1. GİRİŞ YAP
    login: () => {
        const name = document.getElementById('user-name').value;
        if(name) {
            app.user.name = name;
            document.getElementById('display-name').innerText = `Olá, ${name}!`;
            app.showView('screen-dash');
            app.startAI(); // AI'yi başlat
        } else {
            alert("Please enter your name!");
        }
    },

    // 2. KAMERAYI AÇ (Gerçek QR)
    openScanner: () => {
        app.showView('screen-scan');
        app.scanner = new Html5Qrcode("qr-reader");
        
        app.scanner.start(
            { facingMode: "environment" }, 
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                // Kod okundu!
                app.handleSuccess(decodedText);
                app.closeScanner();
            }
        ).catch(err => console.log("Kamera Hatası:", err));
    },

    closeScanner: () => {
        if(app.scanner) {
            app.scanner.stop().then(() => app.scanner.clear());
        }
        app.showView('screen-dash');
    },

    // 3. MANUEL KOD GİRİŞİ
    openManual: () => app.showView('screen-manual'),
    goHome: () => app.showView('screen-dash'),
    
    submitCode: () => {
        const code = document.getElementById('manual-code').value;
        if(code.length === 10) {
            app.handleSuccess(code);
        } else {
            alert("Invalid Code! Must be 10 digits.");
        }
    },

    // 4. BAŞARI SENARYOSU
    handleSuccess: (code) => {
        app.user.entries++;
        document.getElementById('entry-count').innerText = app.user.entries;
        alert(`SUCCESS! 🇧🇷\nCode: ${code}\nYou are 1 step closer to World Cup 2026!`);
        app.goHome();
    },

    // 5. AI HIDRASYON KOÇU
    startAI: () => {
        setTimeout(() => {
            const temp = 34; // Simüle edilen sıcaklık
            document.getElementById('ai-msg').innerText = `São Paulo is ${temp}°C! Drink 500ml now.`;
            document.querySelector('.status-indicator').style.backgroundColor = "red";
        }, 2000);
    }
};
