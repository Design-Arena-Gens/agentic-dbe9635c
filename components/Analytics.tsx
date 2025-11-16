'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, Eye, Heart, Share2, MessageCircle } from 'lucide-react'

interface AnalyticsProps {
  videos: any[]
}

export default function Analytics({ videos }: AnalyticsProps) {
  const generateMockMetrics = () => {
    return {
      views: Math.floor(Math.random() * 50000) + 1000,
      likes: Math.floor(Math.random() * 2000) + 100,
      comments: Math.floor(Math.random() * 500) + 10,
      shares: Math.floor(Math.random() * 1000) + 50,
      ctr: (Math.random() * 10 + 2).toFixed(2),
      avgWatchTime: Math.floor(Math.random() * 40) + 10
    }
  }

  const totalVideos = videos.length
  const totalViews = videos.reduce((sum, v) => sum + (generateMockMetrics().views), 0)
  const avgViews = totalVideos > 0 ? Math.floor(totalViews / totalVideos) : 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h2>
        <p className="text-gray-600">
          Track performance and engagement metrics for your YouTube Shorts
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Real analytics require YouTube Data API integration. These are simulated
          metrics for demonstration purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold">{totalVideos}</p>
          <p className="text-purple-100 text-sm">Total Videos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
          <p className="text-blue-100 text-sm">Total Views</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold">{avgViews.toLocaleString()}</p>
          <p className="text-green-100 text-sm">Avg Views/Video</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold">
            {((Math.random() * 5 + 3)).toFixed(1)}%
          </p>
          <p className="text-orange-100 text-sm">Engagement Rate</p>
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Video Performance</h3>

          {videos.slice(0, 10).map((video) => {
            const metrics = generateMockMetrics()
            return (
              <div
                key={video.id}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {video.title || `Video ${video.id.slice(0, 8)}`}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {video.status || 'Draft'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {metrics.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {metrics.likes.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {metrics.comments.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {metrics.shares.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Shares</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{metrics.ctr}%</p>
                    <p className="text-xs text-gray-500">CTR</p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">{metrics.avgWatchTime}s</p>
                    <p className="text-xs text-gray-500">Avg Watch</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No videos yet</p>
          <p className="text-sm text-gray-500">Generate scripts to get started</p>
        </div>
      )}
    </div>
  )
}
