"use server"

import ai from "@/lib/gemini"
import {
  generateSummaryInput,
  generateSummarySchema,
  generateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/lib/validation"

export const generateSummary = async (input: generateSummaryInput) => {
  const { jobTitle, skills, educations, workExperiences } =
    generateSummarySchema.parse(input)

  const prompt = `
    You are an expert writing assistant specialized in crafting concise, natural, and authentic professional summaries for resumes.

    Your goal:
    - Create a 3–5 sentence summary that sounds warm, confident, and human—like a genuine personal introduction.
    - Avoid corporate jargon, clichés, buzzwords, or exaggerated claims.
    - Use plain, clear language that highlights the individual's key strengths, relevant experience, and career aspirations.
    - Emphasize clarity, honesty, and readability over flashy language.
    - Focus on what the person has accomplished, their core skills, and the type of work they are seeking.

    Generate a professional resume summary based on the information below:

    Job Title: ${jobTitle || "Not provided"}
    Skills: ${skills && skills.length > 0 ? skills.join(", ") : "Not provided"}
    Education: ${
      educations && educations.length > 0
        ? educations.map((e) => `${e.degree} from ${e.school}`).join("; ")
        : "Not provided"
    }
    Work Experience: ${
      workExperiences && workExperiences.length > 0
        ? workExperiences.map((w) => `${w.position} at ${w.company}`).join("; ")
        : "Not provided"
    }
      `.trim()

  try {
    const response = await ai.models.generateContent({
      model: process.env.AI_MODEL!,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    })

    return response.text
  } catch (error) {
    console.error("Gemini summary generation failed:", error)
    return "We couldn't generate a summary at this time. Please try again later."
  }
}

export const generateWorkExperience = async (
  input: generateWorkExperienceInput,
) => {
  const { description } = generateWorkExperienceSchema.parse(input)

  const prompt = `
    You are a resume assistant AI. Based on the description below, generate a structured work experience entry.

    Return only in the following format:
    Job title: <job title>
    Company: <company name>
    Start date: <YYYY-MM-DD> (only if included)
    End date: <YYYY-MM-DD> (only if included)
    Description: <1–3 bullet points describing achievements and tasks>

    Input:
    "${description}"
    `.trim()

  try {
    const response = await ai.models.generateContent({
      model: process.env.AI_MODEL!,
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    })

    const text = response.text

    return {
      position: text?.match(/Job title: (.*)/)?.[1]?.trim() || "",
      company: text?.match(/Company: (.*)/)?.[1]?.trim() || "",
      startDate: text?.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
      endDate: text?.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
      description: (text?.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    }
  } catch (error) {
    console.error("Gemini work experience generation failed:", error)
    throw new Error("AI failed to generate work experience.")
  }
}
