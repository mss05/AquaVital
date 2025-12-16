const app = {
    userData: { name: "", entries: 0 },

    showScreen: (screenId) => {
        document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
        document.getElementById(screenId).style.display = 'flex';
    },

    completeAuth: () => {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const phone = document.getElementById('reg-phone').value;

        if (name && email && phone) {
            app.userData.name = name;
            document.getElementById('display-name').innerText = `Hello, ${name.split(' ')[0]}!`;
            // CRM Kaydı (Simülasyon)
            console.log("Saving to CRM:", {name, email, phone});
            app.showScreen('screen-dash');
            app.runAICoach();
        } else {
            alert("Please fill all fields to join!");
        }
    },

    submitCode: () => {
        const code = document.getElementById('cap-code-input').value;
        if (code.length === 10) {
            app.userData.entries++;
            document.getElementById('entry-count').innerText = app.userData.entries;
            alert("SUCCESS! 1 Entry added for World Cup 2026. 🇧🇷");
            app.showScreen('screen-dash');
        } else {
            alert("Invalid code. Please enter 10 digits.");
        }
    },

    runAICoach: () => {
        const temp = 33; // Local weather simulator
        const statusText = temp > 30 
            ? `It's ${temp}°C! High mineral loss. Drink 500ml now!` 
            : "Hydration levels optimal. Keep it up!";
        document.getElementById('ai-status').innerText = statusText;
    }
};
