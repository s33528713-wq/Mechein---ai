async function askGemini() {
    const output = document.getElementById("output");
    const input = document.getElementById("userInput").value;
    
    if(!input) { alert("Please type something!"); return; }
    
    output.innerText = "Thinking...";
    
    try {
        // আপনার API Key এখানে বসান (AIza দিয়ে শুরু হবে)
        const API_KEY = "আপনার-AIza-দিয়ে-শুরু-হওয়া-কী-টি-এখানে-বসান";
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({contents: [{parts: [{text: input}]}]})
        });
        
        const data = await response.json();
        output.innerText = data.candidates[0].content.parts[0].text;
    } catch (e) {
        output.innerText = "Error: " + e.message;
    }
}
