'use client'

import { useState } from 'react'
import { Video, Loader2, Upload, Download } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

interface VideoCreatorProps {
  onVideoCreated: (video: any) => void
}

export default function VideoCreator({ onVideoCreated }: VideoCreatorProps) {
  const [script, setScript] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [videoPreview, setVideoPreview] = useState<any>(null)

  const createVideo = async () => {
    if (!script || !title) {
      alert('Please provide both title and script')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/create-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script, title })
      })

      const data = await response.json()

      const video = {
        id: uuidv4(),
        title,
        script,
        ...data,
        createdAt: new Date().toISOString(),
        status: 'created'
      }

      setVideoPreview(video)
      onVideoCreated(video)
    } catch (error) {
      console.error('Error creating video:', error)
      alert('Failed to create video. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Video</h2>
        <p className="text-gray-600">
          Generate a complete YouTube Short with AI assets and captions
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Video Creation Process</h3>
        <p className="text-sm text-blue-800">
          This tool generates video specifications and asset suggestions. For actual video rendering,
          integrate with services like:
        </p>
        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
          <li>Remotion for programmatic video generation</li>
          <li>D-ID or Synthesia for AI avatars</li>
          <li>ElevenLabs or Google TTS for voiceovers</li>
          <li>Pexels/Unsplash APIs for stock footage</li>
        </ul>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Script
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder="Paste your script here..."
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>

        <button
          onClick={createVideo}
          disabled={loading || !script || !title}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating Video...
            </>
          ) : (
            <>
              <Video className="w-5 h-5" />
              Create Video
            </>
          )}
        </button>
      </div>

      {videoPreview && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Video Specification</h3>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Title:</p>
              <p className="font-semibold text-gray-900">{videoPreview.title}</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Format:</p>
              <p className="text-gray-800">9:16 (1080x1920) - YouTube Shorts optimized</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Audio Track:</p>
              <p className="text-gray-800">AI voiceover from script text</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Suggested Assets:</p>
              <ul className="list-disc list-inside text-gray-800 space-y-1">
                {videoPreview.assets?.map((asset: string, idx: number) => (
                  <li key={idx}>{asset}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Captions:</p>
              <p className="text-gray-800">Auto-generated from script with word-by-word highlighting</p>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload to YouTube
              </button>
              <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
