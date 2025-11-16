'use client'

import { FileText, Calendar, Tag } from 'lucide-react'

interface VideoLogProps {
  videos: any[]
}

export default function VideoLog({ videos }: VideoLogProps) {
  if (videos.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-900">Video Log</h2>
        <span className="ml-auto text-sm text-gray-500">
          {videos.length} video{videos.length !== 1 ? 's' : ''} created
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Niche</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {videos.slice().reverse().map((video, idx) => (
              <tr
                key={video.id}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  idx === 0 ? 'bg-purple-50' : ''
                }`}
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-gray-900">
                    {video.title || `Video ${video.id.slice(0, 8)}`}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {video.niche || 'General'}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {video.duration ? `${video.duration}s` : 'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">
                  {new Date(video.createdAt).toLocaleDateString()} {new Date(video.createdAt).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    video.status === 'posted'
                      ? 'bg-green-100 text-green-700'
                      : video.status === 'scheduled'
                      ? 'bg-yellow-100 text-yellow-700'
                      : video.status === 'created'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {video.status || 'draft'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
