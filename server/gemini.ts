import { GoogleGenerativeAI } from "@google/generative-ai";

// The Gemini Pro model is designed for complex reasoning
const MODEL_NAME = "gemini-2.0-flash";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeCode(code: string, language: string) {
  const prompt = `
I need a comprehensive code review of the following ${language} code. 
Please analyze it carefully and return a JSON response in the following format:

{
  "summary": "A brief 2-3 sentence summary describing what the code does and overall impression",
  "bugs": [
    {
      "severity": "high|medium|low",
      "description": "Description of the bug or issue",
      "suggestion": "Code suggestion to fix the bug"
    }
  ],
  "readability": {
    "naming": "Assessment of variable/function naming quality with suggestions for improvement",
    "comments": "Assessment of code comments with suggestions",
    "structure": "Assessment of code structure and organization",
    "additionalNotes": "Any additional readability notes"
  },
  "performance": [
    {
      "description": "Description of performance issue or optimization opportunity",
      "suggestion": "Code suggestion for optimization"
    }
  ],
  "recommendations": {
    "improvedCode": "A refactored version of the entire code addressing all issues",
    "keyImprovements": ["List of key improvements made in the refactored code"],
    "additionalNotes": "Any additional improvement notes"
  }
}

Here's the code to review:

\`\`\`${language}
${code}
\`\`\`

Provide a thorough analysis, assuming the reader is a professional developer looking to improve their code quality.
The response must be valid JSON with no markdown formatting, code blocks, or additional explanations outside the JSON structure.
`;

  try {
    // Configure the model
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.2, // Lower temperature for more deterministic outputs
        maxOutputTokens: 4000,
      },
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON from the response
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini's response:", parseError);

      // Attempt to extract JSON if it's wrapped in code blocks or other text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (secondParseError) {
          throw new Error("Gemini did not return proper JSON");
        }
      } else {
        throw new Error("Gemini did not return proper JSON");
      }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
