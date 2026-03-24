import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const generateProposal = async (req, res) => {
  try {
    const data = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not defined in the backend environment variables." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const wordLimitMap = {
      Short: "Maintain brevity. Keep each section to around 50 to 100 words max.",
      Detailed: "Provide a highly detailed, professional analysis. Each section should be comprehensive, around 200 to 300 words.",
      Executive: "Format the output as an executive summary. Keep sections around 100 to 150 words and primarily use bullet points for high legibility."
    };

    const lengthInstruction = wordLimitMap[data.proposalStyle] || wordLimitMap.Detailed;

    let customFieldsStr = "";
    const fieldsToMap = data.templateFields?.length ? data.templateFields : Object.keys(data.customFields || {});
    fieldsToMap.forEach((k) => {
      const v = (data.customFields && data.customFields[k]) || "[Left blank - Please infer standard professional content for this]";
      const readableKey = k.replace(/([A-Z])/g, " $1").trim();
      customFieldsStr += `- ${readableKey}: ${v}\n`;
    });

    const requestedSections = data.templateSections?.length ? data.templateSections : [
      "introduction", "problemStatement", "proposedSolution", "scopeOfWork", "deliverables", "timeline", "pricing", "terms", "conclusion"
    ];
    const jsonExample = requestedSections.map(k => `  "${k}": "..."`).join(",\n");

    const prompt = `
You are an expert, professional business proposal writer. 
Generate a strictly formatted JSON response containing exactly 9 keys representing the core sections of a high-ticket business proposal.

Context Information:
- Proposal Template Focus: ${data.templateName || "General Business"}
- Client Name: ${data.clientName || "The Client"}
- Client Company: ${data.clientCompany || "The Client's Company"}
- Project Name: ${data.projectName || "The Project"}
- Prepared By: ${data.preparedBy || "Our Team"}

Specific Client/Project Inputs provided by the project manager:
${customFieldsStr || "No custom specifics provided. Infer based on the Template Focus."}

Stylistic Guidelines:
- Tone of Voice: ${data.tone || "Professional"}
- Length & Formatting Constraint: ${lengthInstruction}
- Output Requirement: DO NOT wrap the response in markdown code blocks (\`\`\`json ... \`\`\`). Return the PURE JSON string ONLY. It must be instantly parseable by JSON.parse().

The JSON object MUST contain exactly these string keys to perfectly match the requested template output format. NO OTHER root keys are allowed:
{
${jsonExample}
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Safely strip away markdown backticks if the model ignores the instruction
    text = text.replace(/^```json\s*/m, '').replace(/```\s*$/m, '').trim();

    let jsonRes;
    try {
      jsonRes = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parsing failed. Raw text:", text);
      return res.status(500).json({ message: "AI returned malformed JSON", raw: text });
    }

    // Ensure all dynamically requested keys exist
    requestedSections.forEach(k => {
      if (!jsonRes[k]) jsonRes[k] = "No content generated for this section.";
    });

    return res.status(200).json(jsonRes);

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Failed to generate AI proposal", error: error.message });
  }
};

export const generateQuotation = async (req, res) => {
  try {
    const data = req.body;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ message: "GEMINI_API_KEY is not defined in the backend environment variables." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const tone = data.tone || "Professional";
    const style = data.descriptionStyle || "Medium";

    let itemsStr = "";
    if (data.items && data.items.length > 0) {
      data.items.forEach(i => {
        itemsStr += `- ${i.itemName} (Qty: ${i.quantity}, Price: ${i.price})\n`;
      });
    } else {
      itemsStr = "No specific items provided.";
    }

    const prompt = `
You are an expert, professional business quotation writer.
Generate a strictly formatted JSON response containing exactly 3 keys representing the text sections of a quotation.

Context Information:
- Client Name: ${data.clientName || "The Client"}
- Client Company: ${data.clientCompany || "The Client's Company"}
- Project Name: ${data.projectName || "The Project"}

Items Quoted:
${itemsStr}

Stylistic Guidelines:
- Tone of Voice: ${tone}
- Style/Length: ${style}
- Output Requirement: DO NOT wrap the response in markdown code blocks (\`\`\`json ... \`\`\`). Return the PURE JSON string ONLY. It must be instantly parseable by JSON.parse().

The JSON object MUST contain exactly these string keys: "intro", "terms", "closingNote".
{
  "intro": "...",
  "terms": "...",
  "closingNote": "..."
}`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/^```json\s*/m, '').replace(/```\s*$/m, '').trim();

    let jsonRes;
    try {
      jsonRes = JSON.parse(text);
    } catch (parseErr) {
      console.error("JSON parsing failed. Raw text:", text);
      return res.status(500).json({ message: "AI returned malformed JSON", raw: text });
    }

    ["intro", "terms", "closingNote"].forEach(k => {
      if (!jsonRes[k]) jsonRes[k] = "No content generated for this section.";
    });

    return res.status(200).json(jsonRes);

  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Failed to generate AI quotation", error: error.message });
  }
};
