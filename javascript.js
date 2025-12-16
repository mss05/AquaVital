const app = {
    scanner: null,
    isScanning: false,
    user: { name: "", entries: 0 },

    // Sayfa Geçiş
    go: (pageId) => {
        if(app.isScanning) app.stopScanner();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        // Menü yönetimi (sadece Home ve Manual'de mantıklı)
        const nav = document.getElementById('bottom-nav');
        if(pageId === 'page-home') nav.style.display = 'flex';
        else nav.style.display = 'none';
    },

    // Toast Bildirim
    notify: (msg) => {
        const toast = document.getElementById('toast-box');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    login: () => {
        const name = document.getElementById('login-name').value;
        if(!name) return app.notify("Adını girmelisin!");
        
        app.user.name = name;
        document.getElementById('display-name').innerText = name;
        app.go('page-home');
        app.notify("Giriş Başarılı! Bol şans.");
    },

    // Hak Ekleme (Tek Mantık)
    addEntry: () => {
        app.user.entries++;
        document.getElementById('entry-count').innerText = app.user.entries;
        app.notify("TEBRİKLER! +1 Çekiliş Hakkı Eklendi 🇧🇷");
    },

    // Kamera
    openScanner: () => {
        app.go('page-scan');
        app.scanner = new Html5Qrcode("reader");
        app.scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, 
            (decodedText) => {
                app.closeScanner();
                app.addEntry();
            },
            (err) => {}
        ).then(() => { app.isScanning = true; })
         .catch(() => { 
             app.notify("Kamera hatası. Şifreyi elle gir."); 
             app.go('page-manual'); 
         });
    },

    closeScanner: async () => {
        if(app.scanner && app.isScanning) {
            await app.scanner.stop();
            app.scanner.clear();
            app.isScanning = false;
        }
        app.go('page-home');
    },

    // Manuel Giriş
    openManual: () => app.go('page-manual'),
    goHome: () => app.go('page-home'),

    submitCode: () => {
        const code = document.getElementById('manual-code').value;
        if(code.length === 10) {
            app.addEntry();
            app.go('page-home');
        } else {
            app.notify("Kod hatalı! 10 haneli olmalı.");
        }
    }
};
