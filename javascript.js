// OpenWeatherMap API Simülasyonu ve Hidrasyon Mantığı
const userWeight = 75; // Örnek kilo [cite: 48]
const scanBtn = document.getElementById('scan-btn');

async function updateHydration() {
    // Gerçekte API'den gelecek, şimdilik statik Brezilya sıcağı
    const temp = 32; 
    document.getElementById('weather-info').innerText = `São Paulo: ${temp}°C - Hidrate-se!`;
    
    // Basit bir hidrasyon hesabı [cite: 10]
    let goal = userWeight * 35;
    if(temp > 30) goal += 500; // Sıcaklık bonusu [cite: 4]
    
    console.log(`Günlük Hedef: ${goal}ml`);
}

scanBtn.addEventListener('click', () => {
    // QR Tarama Simülasyonu [cite: 187]
    alert("QR Escaneado! Você ganhou 1 cupom para a Copa do Mundo 2026! 🇧🇷");
});

updateHydration();
