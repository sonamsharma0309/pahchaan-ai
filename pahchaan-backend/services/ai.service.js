const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const generateBrandKit = async (brandData) => {
  const {
    businessName, industry, description,
    targetAudience, location, vibes,
    competitors, inspiration,
  } = brandData

  const prompt = `
You are a world-class brand strategist and designer.
Generate a complete brand identity kit for this business.

Business Name: ${businessName}
Industry: ${industry}
Description: ${description}
Target Audience: ${targetAudience}
Location: ${location}
Brand Vibes: ${vibes?.join(', ')}
Competitors: ${competitors || 'Not specified'}
Inspiration: ${inspiration || 'Not specified'}

Respond ONLY in valid JSON format like this:
{
  "brandName": "suggested brand name",
  "tagline": "a catchy tagline",
  "colors": ["#hex1", "#hex2", "#hex3"],
  "fonts": ["Primary Font", "Secondary Font"],
  "brandVoice": "description of tone and voice",
  "socialBio": "Instagram/LinkedIn bio under 150 chars",
  "logoPrompt": "detailed prompt to generate a logo with AI",
  "brandStory": "2-3 sentence brand story",
  "targetPersona": "detailed customer persona"
}
`

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.9,
    max_tokens: 2048,
  })

  const text = completion.choices[0]?.message?.content || ''
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('AI did not return valid JSON')

  return JSON.parse(jsonMatch[0])
}

module.exports = { generateBrandKit }