'use client'

import { useState } from 'react'
import { Sparkles, TrendingUp, Loader2, Copy, Check } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface ScriptGeneratorProps {
  onVideoGenerated: (video: any) => void
}

export default function ScriptGenerator({ onVideoGenerated }: ScriptGeneratorProps) {
  const [niche, setNiche] = useState('')
  const [batchCount, setBatchCount] = useState(1)
  const [duration, setDuration] = useState<'15' | '30' | '60'>('30')
  const [loading, setLoading] = useState(false)
  const [scripts, setScripts] = useState<any[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const niches = [
    'Motivation & Mindset',
    'Psychology Facts',
    'History Stories',
    'Science & Technology',
    'Life Hacks',
    'Finance Tips',
    'Health & Fitness',
    'Mystery & True Crime',
    'Philosophy',
    'Business & Entrepreneurship'
  ]

  const generateScripts = async () => {
    if (!niche) {
      alert('Please select a niche')
      return
    }

    const apiKey = localStorage.getItem('anthropic-api-key')
    if (!apiKey) {
      alert('Please set your Anthropic API key in Settings')
      return
    }

    setLoading(true)
    setScripts([])

    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          niche,
          count: batchCount,
          duration: parseInt(duration),
          apiKey
        })
      })

      const data = await response.json()

      if (data.error) {
        alert('Error: ' + data.error)
        return
      }

      const generatedScripts = data.scripts.map((script: any) => ({
        id: uuidv4(),
        ...script,
        niche,
        duration,
        createdAt: new Date().toISOString(),
        status: 'script'
      }))

      setScripts(generatedScripts)

      generatedScripts.forEach((script: any) => {
        onVideoGenerated(script)
      })
    } catch (error) {
      console.error('Error generating scripts:', error)
      alert('Failed to generate scripts. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const copyScript = (scriptId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(scriptId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Scripts</h2>
        <p className="text-gray-600">
          AI-powered script generation for your YouTube Shorts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niche
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="">Select a niche...</option>
            {niches.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (seconds)
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value as '15' | '30' | '60')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Batch Count
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={batchCount}
            onChange={(e) => setBatchCount(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>

      <button
        onClick={generateScripts}
        disabled={loading || !niche}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating Scripts...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Generate {batchCount} Script{batchCount > 1 ? 's' : ''}
          </>
        )}
      </button>

      {scripts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Generated Scripts</h3>
          {scripts.map((script) => (
            <div key={script.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{script.title}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {script.duration}s
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {script.niche}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => copyScript(script.id, script.script)}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Copy script"
                >
                  {copiedId === script.id ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Script:</p>
                  <p className="text-gray-800 whitespace-pre-wrap">{script.script}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Visual Suggestions:</p>
                  <ul className="list-disc list-inside text-gray-800 space-y-1">
                    {script.visuals.map((visual: string, idx: number) => (
                      <li key={idx} className="text-sm">{visual}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Text Overlays:</p>
                  <div className="flex flex-wrap gap-2">
                    {script.textOverlays.map((overlay: string, idx: number) => (
                      <span key={idx} className="text-sm bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                        {overlay}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {script.keywords.map((keyword: string, idx: number) => (
                      <span key={idx} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                  <p className="text-sm text-gray-700">{script.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
