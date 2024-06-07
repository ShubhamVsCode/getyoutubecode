const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

async function getCode(screenshot) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const image = fileToGenerativePart(screenshot, "image/png");

  const prompt = `
  Here is a screenshot of a youtube video where a user is coding

  Please give the exact code that you can see in the image don't modify it.
  `;

  console.log("prompt", prompt);
  console.log("image", image);

  try {
    const result = await model.generateContent([prompt, image]);
    console.log("result", result);
    const response = await result.response;
    console.log("response", response);
    const text = response.text();
    console.log("text", text);

    return text;
  } catch (error) {
    console.error("Error", error);
  }
}

module.exports = { getCode };
