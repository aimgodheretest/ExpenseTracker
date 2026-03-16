const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getCategoryFromAI = async (description) => {
  try {
    const prompt = `
Categorize the following expense into ONE word only.

Possible categories:
Food
Fuel
Movies
Travel
Shopping
Bills
Entertainment
Other

Expense: ${description}

Return only the category word.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    const text =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Other";

    return text.trim();
  } catch (error) {
    console.log("AI ERROR:", error);
    return "Other";
  }
};

module.exports = {
  getCategoryFromAI,
};
