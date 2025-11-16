'use client'

import { useState, useEffect } from 'react'
import { Video, TrendingUp, Calendar, BarChart3, Sparkles, Upload, Settings } from 'lucide-react'
import ScriptGenerator from '@/components/ScriptGenerator'
import VideoCreator from '@/components/VideoCreator'
import Scheduler from '@/components/Scheduler'
import Analytics from '@/components/Analytics'
import VideoLog from '@/components/VideoLog'

type Tab = 'generate' | 'create' | 'schedule' | 'analytics' | 'settings'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('generate')
  const [videos, setVideos] = useState<any[]>([])

  useEffect(() => {
    const savedVideos = localStorage.getItem('youtube-shorts-videos')
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos))
    }
  }, [])

  const addVideo = (video: any) => {
    const updatedVideos = [...videos, video]
    setVideos(updatedVideos)
    localStorage.setItem('youtube-shorts-videos', JSON.stringify(updatedVideos))
  }

  const tabs = [
    { id: 'generate' as Tab, label: 'Generate Scripts', icon: Sparkles },
    { id: 'create' as Tab, label: 'Create Videos', icon: Video },
    { id: 'schedule' as Tab, label: 'Schedule', icon: Calendar },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              YouTube Shorts AI Agent
            </h1>
          </div>
          <p className="text-gray-600 ml-16">
            Automate your YouTube Shorts content creation, scheduling, and analytics
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-purple-600 text-purple-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            {activeTab === 'generate' && <ScriptGenerator onVideoGenerated={addVideo} />}
            {activeTab === 'create' && <VideoCreator onVideoCreated={addVideo} />}
            {activeTab === 'schedule' && <Scheduler videos={videos} />}
            {activeTab === 'analytics' && <Analytics videos={videos} />}
            {activeTab === 'settings' && <SettingsPanel />}
          </div>
        </div>

        <div className="mt-8">
          <VideoLog videos={videos} />
        </div>
      </div>
    </div>
  )
}

function SettingsPanel() {
  const [apiKey, setApiKey] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')

  useEffect(() => {
    setApiKey(localStorage.getItem('anthropic-api-key') || '')
    setYoutubeChannel(localStorage.getItem('youtube-channel-id') || '')
  }, [])

  const saveSettings = () => {
    localStorage.setItem('anthropic-api-key', apiKey)
    localStorage.setItem('youtube-channel-id', youtubeChannel)
    alert('Settings saved successfully!')
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
        <p className="text-gray-600 mb-6">
          Configure your API keys and channel settings
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anthropic API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used for AI script generation
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Channel ID
          </label>
          <input
            type="text"
            value={youtubeChannel}
            onChange={(e) => setYoutubeChannel(e.target.value)}
            placeholder="UCxxxxxxxx..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your YouTube channel ID for posting videos
          </p>
        </div>

        <button
          onClick={saveSettings}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          Save Settings
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Setup Instructions</h3>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Get your Anthropic API key from console.anthropic.com</li>
          <li>Enable YouTube Data API v3 in Google Cloud Console</li>
          <li>Create OAuth 2.0 credentials for YouTube uploads</li>
          <li>Note: Full YouTube upload requires OAuth flow implementation</li>
        </ol>
      </div>
    </div>
  )
}
