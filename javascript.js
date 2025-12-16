const langData = {
    tr: {
        title: "FIFA World Cup 2026 Heyecanı!",
        subtitle: "5 Şanslı Kişiye Bilet Hediye! Kapağı okut, yerini ayırt.",
        lblName: "Adın Soyadın",
        phName: "Ad Soyad Giriniz",
        btnLogin: "ÇEKİLİŞE KATIL",
        welcome: "Merhaba,",
        draw: "ÇEKİLİŞ",
        rights: "HAK",
        prizeInfo: "Toplam 5 Kişiye Maç Bileti.",
        ai: "Hava Sıcak! Bol su içmeyi unutma.",
        howTitle: "Nasıl Kazanırım?",
        step1: "AquaVital World Cup şişesini al.",
        step2: "Kapağın altındaki QR kodu okut.",
        step3: "5 Biletten birini kazanma şansı yakala!",
        scanGuide: "QR Kodu Çerçeveye Getir",
        cancel: "Vazgeç ✖",
        enterCode: "Şifreyi Gir",
        manualDesc: "Kapak altındaki kodu buraya yaz.",
        phCode: "KOD",
        submit: "GÖNDER",
        back: "← Geri Dön",
        navRights: "Haklarım",
        navCode: "Şifre Gir",
        msgLogin: "Lütfen adınızı girin!",
        msgWelcome: "Giriş Başarılı! Bol şans.",
        msgSuccess: "TEBRİKLER! +1 Çekiliş Hakkı 🇧🇷",
        msgError: "Kod Hatalı!",
        msgCamError: "Kamera Hatası."
    },
    en: {
        title: "FIFA World Cup 2026 Excitement!",
        subtitle: "5 Tickets Giveaway! Scan the cap, get the chance.",
        lblName: "Full Name",
        phName: "Enter Full Name",
        btnLogin: "JOIN DRAW",
        welcome: "Hello,",
        draw: "RAFFLE",
        rights: "ENTRY",
        prizeInfo: "Total 5 Match Tickets Giveaway.",
        ai: "It's Hot! Drink plenty of water.",
        howTitle: "How to Win?",
        step1: "Buy AquaVital World Cup bottle.",
        step2: "Scan the QR code under the cap.",
        step3: "Get a chance to win one of 5 tickets!",
        scanGuide: "Align QR Code in Frame",
        cancel: "Cancel ✖",
        enterCode: "Enter Code",
        manualDesc: "Type the code found under the cap.",
        phCode: "CODE",
        submit: "SUBMIT",
        back: "← Go Back",
        navRights: "Entries",
        navCode: "Enter Code",
        msgLogin: "Please enter your name!",
        msgWelcome: "Login Success! Good luck.",
        msgSuccess: "CONGRATS! +1 Entry Added 🇧🇷",
        msgError: "Invalid Code!",
        msgCamError: "Camera Error."
    },
    pt: {
        title: "Emoção da Copa do Mundo 2026!",
        subtitle: "Sorteio de 5 Ingressos! Escaneie a tampa, tente a sorte.",
        lblName: "Nome Completo",
        phName: "Digite seu Nome",
        btnLogin: "PARTICIPAR",
        welcome: "Olá,",
        draw: "SORTEIO",
        rights: "CHANCES",
        prizeInfo: "Sorteio de 5 Ingressos no Total.",
        ai: "Está Quente! Beba bastante água.",
        howTitle: "Como Ganhar?",
        step1: "Compre uma garrafa AquaVital WC.",
        step2: "Escaneie o QR code sob a tampa.",
        step3: "Tenha a chance de ganhar um dos 5 ingressos!",
        scanGuide: "Alinhe o QR Code",
        cancel: "Cancelar ✖",
        enterCode: "Digitar Código",
        manualDesc: "Digite o código encontrado sob a tampa.",
        phCode: "CÓDIGO",
        submit: "ENVIAR",
        back: "← Voltar",
        navRights: "Chances",
        navCode: "Digitar",
        msgLogin: "Por favor, digite seu nome!",
        msgWelcome: "Sucesso! Boa sorte.",
        msgSuccess: "PARABÉNS! +1 Chance Adicionada 🇧🇷",
        msgError: "Código Inválido!",
        msgCamError: "Erro na Câmera."
    }
};

const app = {
    scanner: null,
    isScanning: false,
    currentLang: 'tr', 
    user: { name: "", entries: 0 },

    setLang: (lang) => {
        app.currentLang = lang;
        const data = langData[lang];

        // Bayrakları güncelle
        document.querySelectorAll('.flag-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById(`btn-${lang}`).classList.add('active');

        // Metinleri Değiştir
        document.getElementById('txt-title').innerText = data.title;
        document.getElementById('txt-subtitle').innerText = data.subtitle;
        document.getElementById('lbl-name').innerText = data.lblName;
        document.getElementById('login-name').placeholder = data.phName;
        document.getElementById('btn-login').innerText = data.btnLogin;

        document.getElementById('txt-welcome').innerText = data.welcome;
        document.getElementById('txt-draw').innerText = data.draw;
        document.getElementById('txt-rights').innerText = data.rights;
        document.getElementById('txt-prize-info').innerText = data.prizeInfo;
        document.getElementById('txt-ai').innerHTML = `<b>AquaVital:</b> ${data.ai}`;

        document.getElementById('txt-how-title').innerText = data.howTitle;
        document.getElementById('txt-step1').innerText = data.step1;
        document.getElementById('txt-step2').innerText = data.step2;
        document.getElementById('txt-step3').innerText = data.step3;

        document.getElementById('txt-scan-guide').innerText = data.scanGuide;
        document.getElementById('btn-cancel').innerText = data.cancel;
        
        document.getElementById('txt-enter-code').innerText = data.enterCode;
        document.getElementById('txt-manual-desc').innerText = data.manualDesc;
        document.getElementById('manual-code').placeholder = data.phCode;
        document.getElementById('btn-submit').innerText = data.submit;
        document.getElementById('btn-back').innerText = data.back;

        document.getElementById('nav-rights').innerText = data.navRights;
        document.getElementById('nav-code').innerText = data.navCode;
    },

    go: (pageId) => {
        if(app.isScanning) app.stopScanner();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        const nav = document.getElementById('bottom-nav');
        if(pageId === 'page-home') nav.style.display = 'flex';
        else nav.style.display = 'none';
    },

    notify: (msg) => {
        const toast = document.getElementById('toast-box');
        toast.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    login: () => {
        const name = document.getElementById('login-name').value;
        const msgs = langData[app.currentLang];
        
        if(!name) return app.notify(msgs.msgLogin);
        
        app.user.name = name;
        document.getElementById('display-name').innerText = name;
        app.go('page-home');
        app.notify(msgs.msgWelcome);
    },

    addEntry: () => {
        app.user.entries++;
        document.getElementById('entry-count').innerText = app.user.entries;
        app.notify(langData[app.currentLang].msgSuccess);
    },

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
             app.notify(langData[app.currentLang].msgCamError); 
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

    openManual: () => app.go('page-manual'),
    goHome: () => app.go('page-home'),

    submitCode: () => {
        const code = document.getElementById('manual-code').value;
        if(code.length === 10) {
            app.addEntry();
            app.go('page-home');
        } else {
            app.notify(langData[app.currentLang].msgError);
        }
    }
};

window.onload = () => app.setLang('tr');
