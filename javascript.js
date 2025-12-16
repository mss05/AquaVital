const scanBtn = document.getElementById('scan-code');
let entries = 0;

// AI Hydration Coaching (Based on climate and user data)
function getHydrationAdvice() {
    const temp = 34; // Local weather API data 
    const advice = temp > 30 
        ? "Extreme Heat! You need 500ml AquaVital to balance minerals." 
        : "Standard hydration levels recommended.";
    document.getElementById('ai-advice').innerText = advice;
}

// Code Redemption Logic (Kazandirio Style)
scanBtn.onclick = () => {
    // Simulate camera scan
    const mockCode = prompt("Enter the 10-digit code under the AquaVital cap:");
    
    if(mockCode && mockCode.length === 10) {
        entries++;
        document.getElementById('entry-count').innerText = entries;
        alert("Success! 1 World Cup Entry added to your wallet. 🇧🇷");
    } else {
        alert("Invalid code. Please check the bottle cap.");
    }
};

getHydrationAdvice();
