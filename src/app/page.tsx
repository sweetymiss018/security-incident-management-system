'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import IncidentPlayer from '@/components/IncidentPlayer'
import IncidentList from '@/components/IncidentList'

// Type definitions
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

export default function Dashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)
  const [showResolved, setShowResolved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch incidents from API
  const fetchIncidents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/incidents?resolved=${showResolved}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch incidents')
      }
      
      const data = await response.json()
      setIncidents(data)
      
      // Set first incident as selected if none selected
      if (data.length > 0 && !selectedIncident) {
        setSelectedIncident(data[0])
      }
    } catch (error) {
      console.error('Error fetching incidents:', error)
      setError('Failed to load incidents. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Handle resolving an incident
  const resolveIncident = async (incidentId: number) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}/resolve`, {
        method: 'PATCH',
      })
      
      if (response.ok) {
        // Refresh incidents after resolving
        fetchIncidents()
        // If resolved incident was selected, clear selection
        if (selectedIncident?.id === incidentId) {
          setSelectedIncident(null)
        }
      }
    } catch (error) {
      console.error('Error resolving incident:', error)
    }
  }

  // Fetch incidents on component mount and when showResolved changes
  useEffect(() => {
    fetchIncidents()
  }, [showResolved])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left side - Main Video Player */}
        <div className="flex-1">
          <IncidentPlayer 
            incident={selectedIncident}
            onResolve={resolveIncident}
          />
        </div>
        
        {/* Right side - Incident List */}
        <div className="w-80">
          <IncidentList
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={setSelectedIncident}
            showResolved={showResolved}
            onToggleResolved={setShowResolved}
            onResolve={resolveIncident}
          />
        </div>
      </div>
    </div>
  )
}