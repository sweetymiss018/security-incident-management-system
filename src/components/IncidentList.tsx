import { AlertTriangle, CheckCircle } from 'lucide-react'

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

interface IncidentListProps {
  incidents: Incident[]
  selectedIncident: Incident | null
  onSelectIncident: (incident: Incident) => void
  showResolved: boolean
  onToggleResolved: (show: boolean) => void
  onResolve: (incidentId: number) => void
}

export default function IncidentList({ 
  incidents, 
  selectedIncident, 
  onSelectIncident, 
  showResolved, 
  onToggleResolved,
  onResolve 
}: IncidentListProps) {
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' - ' + new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit', 
      minute: '2-digit'
    }) + ' on ' + new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'Gun Threat':
        return '🔫'
      case 'Unauthorised Access':
        return '⚠️'
      case 'Face Recognised': 
        return '👤'
      default:
        return '⚠️'
    }
  }

  const unresolvedCount = incidents.filter(i => !i.resolved).length
  const resolvedCount = incidents.filter(i => i.resolved).length

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span className="text-white font-medium text-lg">
              {unresolvedCount} Unresolved Incidents
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{resolvedCount} resolved incidents</span>
          </div>
        </div>
      </div>

      {/* Incidents List */}
      <div className="flex-1 overflow-y-auto">
        {incidents.length === 0 ? (
          <div className="text-center text-gray-400 mt-8 p-4">
            <p>No {showResolved ? 'resolved' : 'unresolved'} incidents</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <div
              key={incident.id}
              onClick={() => onSelectIncident(incident)}
              className={`border-b border-gray-700 p-4 cursor-pointer hover:bg-gray-800 transition-colors ${
                selectedIncident?.id === incident.id ? 'bg-gray-800 border-l-4 border-l-orange-500' : ''
              }`}
            >
              <div className="flex space-x-3">
                {/* Thumbnail */}
                <div className="w-16 h-12 bg-gray-700 rounded flex-shrink-0 relative overflow-hidden">
                  <div className={`w-full h-full ${
                    incident.type === 'Gun Threat' ? 'bg-gradient-to-br from-red-800 to-red-600' :
                    incident.type === 'Unauthorised Access' ? 'bg-gradient-to-br from-orange-800 to-orange-600' :
                    'bg-gradient-to-br from-blue-800 to-blue-600'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Incident type with icon */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getIncidentIcon(incident.type)}</span>
                    <span className={`font-medium ${
                      incident.type === 'Gun Threat' ? 'text-red-400' :
                      incident.type === 'Unauthorised Access' ? 'text-orange-400' :
                      'text-blue-400'
                    }`}>
                      {incident.type}
                    </span>
                  </div>

                  {/* Camera info */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-gray-400 text-sm">📹</span>
                    <span className="text-white text-sm">{incident.camera.location} {incident.camera.name}</span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-gray-400 text-sm">🕐</span>
                    <span className="text-gray-300 text-sm">{formatTime(incident.tsStart)}</span>
                  </div>

                  {/* Resolve button */}
                  {!incident.resolved ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onResolve(incident.id)
                      }}
                      className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-1.5 rounded text-sm font-medium transition-colors"
                    >
                      Resolve →
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 text-green-500 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Resolved</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}