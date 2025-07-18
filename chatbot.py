import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="ddsdfdsfsdf")

# Use free, fast model
model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        break
    try:
        response = model.generate_content(user_input)
        print("Bot:", response.text)
    except Exception as e:
        print("❌ Error:", e)
