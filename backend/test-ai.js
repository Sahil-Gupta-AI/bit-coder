import dotenv from "dotenv";
dotenv.config();

async function test() {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return console.error("No key via process.env.GEMINI_API_KEY");
    console.log("Found key starting with:", key.substring(0, 5));
    
    // Fetch directly from REST endpoint
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    console.log("Allowed models:");
    data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } catch (err) {
    console.error("Test failed:", err);
  }
}
test();
