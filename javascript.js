const app = {
    scanner: null,
    isScanning: false,
    user: { name: "", tickets: 0 },

    // Ekran Değiştir
    show: (id) => {
        // Tüm sayfaları gizle
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        // İstenen sayfayı göster
        document.getElementById(id).classList.add('active');
        
        // Alt menü sadece Home ekranında görünsün
        const nav = document.getElementById('bottom-nav');
        if (id === 'view-home') nav.style.display = 'flex';
        else nav.style.display = 'none';
    },

    login: () => {
        const name = document.getElementById('inp-name').value;
        if (!name) return alert("Lütfen adını gir!");
        app.user.name = name;
        document.getElementById('display-name').innerText = name;
        app.show('view-home');
        app.startAI();
    },

    // KAMERA İŞLEMLERİ (Async/Await ile Çökme Önleyici)
    startScanner: () => {
        app.show('view-scan');
        if (app.isScanning) return;

        app.scanner = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        app.scanner.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                app.handleSuccess(decodedText);
            },
            (err) => {}
        ).then(() => {
            app.isScanning = true;
        }).catch(err => {
            alert("Kamera hatası: Lütfen HTTPS kullan.");
            app.stopScanner();
        });
    },

    stopScanner: async () => {
        if (app.scanner && app.isScanning) {
            try {
                await app.scanner.stop();
                app.scanner.clear();
                app.isScanning = false;
            } catch (err) { console.log(err); }
        }
        app.show('view-home');
    },

    handleSuccess: (code) => {
        app.stopScanner().then(() => {
            app.user.tickets++;
            document.getElementById('ticket-count').innerText = app.user.tickets;
            alert(`TEBRİKLER! 🎉\nKod Onaylandı: ${code}\n1 Çekiliş Hakkı Eklendi.`);
        });
    },

    // Manuel Giriş
    openManual: () => app.show('view-manual'),
    goHome: () => app.show('view-home'),

    verifyCode: () => {
        const code = document.getElementById('manual-code').value;
        if (code.length === 10) {
            app.handleSuccess(code);
            app.goHome();
        } else {
            alert("Hatalı Kod! Lütfen 10 haneli kodu kontrol et.");
        }
    },

    startAI: () => {
        setTimeout(() => {
            document.getElementById('ai-text').innerText = "Hava sıcak (34°C). 500ml su içmelisin!";
        }, 2000);
    }
};
