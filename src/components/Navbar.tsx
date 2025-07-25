import { Grid3X3, Camera, VideoIcon, AlertTriangle, Users } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-xl font-bold text-white">MANDLACX</h1>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          <button className="flex items-center space-x-2 px-4 py-2 rounded bg-orange-400 text-white text-sm">
            <Grid3X3 className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm">
            <Camera className="h-4 w-4" />
            <span>Cameras</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm">
            <VideoIcon className="h-4 w-4" />
            <span>Scenes</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Incidents</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 text-sm">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-white text-sm font-medium">Miss Sweety</p>
            <p className="text-gray-400 text-xs">sweetymiss018@gmail.com</p>
          </div>
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">MS</span>
          </div>
        </div>
      </div>
    </nav>
  )
}