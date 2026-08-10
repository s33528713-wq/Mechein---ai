async function analyzeFault() {
    const fileInput = document.getElementById('faultImage');
    const resultDiv = document.getElementById('result');
    // নিচের লাইনে API Key বসবে
    const apiKey = Key
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
  -H 'Content-Type: application/json' \
  -H 'X-goog-api-key: AQ.Ab8RN6K9OIHirr77bJ70M58E6rcFwZq-Yq0zupuqE4IdZxSHJA' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("দয়া করে একটি ছবি তুলুন বা আপলোড করুন");
        return;
    }

    resultDiv.innerText = "বিশ্লেষণ চলছে... অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।";

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
        try {
            const base64Image = reader.result.split(',')[1];
            
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: "তুমি Plasmax কোটিং মেশিনের ট্রাবলশুটিং বিশেষজ্ঞ। ছবিতে থাকা ফল্ট বা এরর কোড ম্যানুয়াল অনুযায়ী বিশ্লেষণ করে ১. সমস্যা, ২. সম্ভাব্য কারণ, এবং ৩. সমাধানের ধাপগুলো বাংলায় সহজভাবে বুঝিয়ে বলো।" },
                            { inline_data: { mime_type: file.type || "image/jpeg", data: base64Image } }
                        ]
                    }]
                })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                resultDiv.innerText = data.candidates[0].content.parts[0].text;
            } else {
                resultDiv.innerText = "কোনো সমাধান পাওয়া যায়নি। ছবি পরিষ্কার করে আবার চেষ্টা করুন।";
            }
        } catch (error) {
            resultDiv.innerText = "ত্রুটি ঘটেছে: " + error.message;
        }
    };

    reader.readAsDataURL(file);
}
