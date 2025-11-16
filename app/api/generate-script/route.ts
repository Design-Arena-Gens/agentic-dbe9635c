import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(request: NextRequest) {
  try {
    const { niche, count, duration, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      )
    }

    const anthropic = new Anthropic({ apiKey })

    const prompt = `You are a YouTube Shorts script writer specializing in faceless content. Generate ${count} engaging short-form video script(s) for the niche: "${niche}". Each video should be approximately ${duration} seconds long.

For EACH script, provide:
1. A catchy, SEO-optimized title
2. The complete script with an engaging hook, concise storytelling, and strong CTA
3. 3-5 visual suggestions (stock footage, images, or AI-generated scenes)
4. 3-5 text overlay suggestions for key points
5. 5-10 relevant keywords/tags for YouTube SEO
6. A compelling video description (100-150 characters)

Format your response as a JSON array with this structure:
[
  {
    "title": "Video title here",
    "script": "Full script text here with clear hooks and CTA",
    "visuals": ["Visual suggestion 1", "Visual suggestion 2", ...],
    "textOverlays": ["Overlay text 1", "Overlay text 2", ...],
    "keywords": ["keyword1", "keyword2", ...],
    "description": "Video description here"
  }
]

Make the content viral-worthy, attention-grabbing, and optimized for the YouTube Shorts algorithm. Focus on trending topics within the niche.`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : ''

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    const scripts = JSON.parse(jsonMatch[0])

    return NextResponse.json({ scripts })
  } catch (error: any) {
    console.error('Error generating scripts:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate scripts' },
      { status: 500 }
    )
  }
}
