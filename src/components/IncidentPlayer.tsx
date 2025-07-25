import { Play, Pause, SkipBack, RotateCcw, SkipForward } from 'lucide-react'
import { useState } from 'react'

interface Camera {
  id: number
  name: string
  location: string
}

interface Incident {
  id: number
  cameraId: number
  type: string
  tsStart: string
  tsEnd: string
  thumbnailUrl: string
  resolved: boolean
  camera: Camera
}

interface IncidentPlayerProps {
  incident: Incident | null
  onResolve: (incidentId: number) => void
}

export default function IncidentPlayer({ incident, onResolve }: IncidentPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="text-center text-gray-400">
          <p>No incident selected</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }) + ' - ' + new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Main Video Area - takes most of the space */}
      <div className="flex-1 min-h-0 relative bg-black">
        {/* Timestamp overlay top left */}
        <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-white text-sm font-mono z-10">
          {formatDate(incident.tsStart)}
        </div>

        {/* Main video content - jewelry store scene */}
        <div className="w-full h-full relative">
          {/* Static image background */}
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Jewelry store CCTV view"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = 'none';
            //   e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          
          {/* Fallback background if image fails */}
          <div className="w-full h-full bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300 relative overflow-hidden" style={{display: 'none'}}>
            {/* Simulated jewelry store shelves */}
            <div className="absolute inset-0 opacity-30">
              <div className="grid grid-cols-6 gap-4 p-8 h-full">
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="bg-amber-800 rounded opacity-40"></div>
                ))}
              </div>
            </div>
            
            {/* Simulated person/safe area */}
            <div className="absolute left-1/3 top-1/2 transform -translate-y-1/2 w-32 h-48 bg-gray-400 rounded opacity-70"></div>
            <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 w-24 h-32 bg-gray-700 rounded opacity-60"></div>
          </div>

          {/* Camera thumbnails in corners */}
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <div className="w-32 h-20 bg-gray-800 rounded border border-gray-600 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Camera 02"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                //   e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 opacity-80" style={{display: 'none'}}></div>
              <div className="absolute bottom-1 left-1 text-white text-xs font-mono bg-black/50 px-1 rounded">Camera - 02</div>
            </div>
            <div className="w-32 h-20 bg-gray-800 rounded border border-gray-600 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                alt="Camera 03"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                //   e.currentTarget.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-green-900 to-green-700 opacity-80" style={{display: 'none'}}></div>
              <div className="absolute bottom-1 left-1 text-white text-xs font-mono bg-black/50 px-1 rounded">Camera - 03</div>
            </div>
          </div>

          {/* Main camera label */}
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-mono text-sm bg-black/50 px-2 py-1 rounded">Camera - 01</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls - fixed height */}
      <div className="bg-black px-6 py-3 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          {/* Playback controls */}
          <div className="flex items-center space-x-4">
            <button className="text-white hover:text-gray-300">
              <SkipBack className="h-4 w-4" />
            </button>
            <button className="text-white hover:text-gray-300">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-black rounded-full p-1.5 hover:bg-gray-200"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
            <button className="text-white hover:text-gray-300">
              <RotateCcw className="h-4 w-4 scale-x-[-1]" />
            </button>
            <button className="text-white hover:text-gray-300">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Time display */}
          <div className="text-white font-mono text-xs">
            {new Date(incident.tsStart).toLocaleTimeString('en-GB')} ({new Date(incident.tsStart).toLocaleDateString('en-GB')})
          </div>

          {/* Speed control */}
          <div className="text-white text-xs">
            1x
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-1">
          <div className="text-white text-xs font-medium">Camera List</div>
          
          {/* Timeline ruler */}
          <div className="relative bg-gray-800 h-8 rounded">
            {/* Hour markers */}
            <div className="absolute inset-0 flex justify-between items-center px-2">
              {Array.from({ length: 17 }, (_, i) => (
                <div key={i} className="text-xs text-gray-400 font-mono">
                  {String(i).padStart(2, '0')}:00
                </div>
              ))}
            </div>
            
            {/* Current time indicator */}
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-1 h-6 bg-orange-500 rounded">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                03:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}