import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AgeGroup, GenerationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    activities: {
      type: Type.ARRAY,
      description: "A list of 3 distinct math-embedding activities.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "A catchy, fun title for the activity.",
          },
          description: {
            type: Type.STRING,
            description: "Simple, step-by-step instructions for the parent. Keep it conversational.",
          },
          mathConcept: {
            type: Type.STRING,
            description: "The primary math concept (e.g., Cardinality, Sorting, Measurement, Spatial Awareness).",
          },
          educationalValue: {
            type: Type.STRING,
            description: "A brief explanation of why this helps the child learn, referencing ECE principles (like DREME/NAEYC standards) in simple terms.",
          },
          difficulty: {
            type: Type.STRING,
            enum: ["Easy", "Medium", "Advanced"],
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Keywords like 'Counting', 'Patterns', 'Shapes'.",
          },
        },
        required: ["title", "description", "mathConcept", "educationalValue", "difficulty", "tags"],
      },
    },
  },
  required: ["activities"],
};

export const generateMathActivities = async (
  routine: string,
  ageGroup: AgeGroup
): Promise<GenerationResponse> => {
  const prompt = `
    Act as an expert Early Childhood Educator with a PhD, specializing in family engagement and early math development.
    You are deeply familiar with resources like Stanford's DREME (Development and Research in Early Math Education) and NAEYC guidelines.

    The user is a parent or family member of a child aged ${ageGroup}.
    They want to embed math into the following household routine: "${routine}".

    Please generate 3 distinct, simple, and playful ideas to incorporate math learning into this specific routine.
    
    Guidelines:
    1. **Simplicity:** The ideas must be easy for a tired parent to execute without extra materials.
    2. **Age Appropriateness:** Tailor the complexity of the math (counting vs. addition vs. simple estimation) to the age group ${ageGroup}.
    3. **Educational Depth:** Ensure the activities promote "Math Talk" and conceptual understanding, not just rote drilling.
    4. **Variety:** Provide three different types of math concepts (e.g., one counting, one spatial, one measurement/patterning).

    Return the response in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a helpful, encouraging, and expert ECE math consultant for parents.",
        temperature: 0.7, // Moderate creativity for engaging ideas but reliable math
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated");
    }

    return JSON.parse(text) as GenerationResponse;
  } catch (error) {
    console.error("Error generating math activities:", error);
    throw error;
  }
};
