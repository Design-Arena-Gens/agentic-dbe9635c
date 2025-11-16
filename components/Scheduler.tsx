'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Upload, Trash2, Play } from 'lucide-react'
import { format, addDays } from 'date-fns'

interface SchedulerProps {
  videos: any[]
}

export default function Scheduler({ videos }: SchedulerProps) {
  const [selectedVideo, setSelectedVideo] = useState('')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [schedule, setSchedule] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('youtube-schedule')
    if (saved) {
      setSchedule(JSON.parse(saved))
    }
  }, [])

  const saveSchedule = (newSchedule: any[]) => {
    setSchedule(newSchedule)
    localStorage.setItem('youtube-schedule', JSON.stringify(newSchedule))
  }

  const addToSchedule = () => {
    if (!selectedVideo || !scheduledDate || !scheduledTime) {
      alert('Please fill all fields')
      return
    }

    const video = videos.find(v => v.id === selectedVideo)
    if (!video) return

    const scheduleItem = {
      id: Math.random().toString(36).substr(2, 9),
      videoId: video.id,
      title: video.title,
      scheduledFor: `${scheduledDate}T${scheduledTime}`,
      status: 'scheduled'
    }

    saveSchedule([...schedule, scheduleItem])
    setSelectedVideo('')
    setScheduledDate('')
    setScheduledTime('')
  }

  const removeFromSchedule = (id: string) => {
    saveSchedule(schedule.filter(item => item.id !== id))
  }

  const quickSchedule = (interval: 'daily' | 'bidaily' | 'weekly') => {
    if (videos.length === 0) {
      alert('No videos available to schedule')
      return
    }

    const newSchedule: any[] = []
    const startDate = new Date()
    const baseTime = '10:00'

    videos.slice(0, 10).forEach((video, index) => {
      let days = 0
      if (interval === 'daily') days = index
      else if (interval === 'bidaily') days = index * 2
      else if (interval === 'weekly') days = index * 7

      const scheduleDate = format(addDays(startDate, days), 'yyyy-MM-dd')

      newSchedule.push({
        id: Math.random().toString(36).substr(2, 9),
        videoId: video.id,
        title: video.title,
        scheduledFor: `${scheduleDate}T${baseTime}`,
        status: 'scheduled'
      })
    })

    saveSchedule([...schedule, ...newSchedule])
  }

  const availableVideos = videos.filter(v =>
    !schedule.some(s => s.videoId === v.id)
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Videos</h2>
        <p className="text-gray-600">
          Schedule your YouTube Shorts for automatic posting
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Automatic posting requires YouTube OAuth authentication and a background
          scheduler service. This interface demonstrates the scheduling workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => quickSchedule('daily')}
          className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-3 rounded-lg font-medium transition-colors"
        >
          Schedule Daily
        </button>
        <button
          onClick={() => quickSchedule('bidaily')}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-lg font-medium transition-colors"
        >
          Schedule Bi-Daily
        </button>
        <button
          onClick={() => quickSchedule('weekly')}
          className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-3 rounded-lg font-medium transition-colors"
        >
          Schedule Weekly
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Scheduling</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Video
            </label>
            <select
              value={selectedVideo}
              onChange={(e) => setSelectedVideo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="">Choose a video...</option>
              {availableVideos.map((video) => (
                <option key={video.id} value={video.id}>
                  {video.title || `Video ${video.id.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              min={format(new Date(), 'yyyy-MM-dd')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={addToSchedule}
          disabled={!selectedVideo || !scheduledDate || !scheduledTime}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Add to Schedule
        </button>
      </div>

      {schedule.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Scheduled Posts ({schedule.length})
          </h3>

          <div className="space-y-3">
            {schedule
              .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
              .map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(item.scheduledFor), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(item.scheduledFor), 'hh:mm a')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-700'
                          : item.status === 'posted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => alert('Post now feature - integrate with YouTube API')}
                      className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      title="Post now"
                    >
                      <Play className="w-5 h-5 text-green-600" />
                    </button>
                    <button
                      onClick={() => removeFromSchedule(item.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
