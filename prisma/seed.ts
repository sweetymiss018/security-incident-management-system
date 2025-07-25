import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.incident.deleteMany()
  await prisma.camera.deleteMany()

  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Camera 01',
        location: 'Shop Floor A',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera 02',
        location: 'Vault',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Camera 03',
        location: 'Entrance',
      },
    }),
  ])

  // Create incidents with realistic timestamps over 24 hours
  const now = new Date()
  const incidents = [
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 23 * 60 * 60 * 1000), // 23 hours ago
      tsEnd: new Date(now.getTime() - 22.5 * 60 * 60 * 1000), // 22.5 hours ago
      thumbnailUrl: '/thumbnails/incident1.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 20 * 60 * 60 * 1000), // 20 hours ago
      tsEnd: new Date(now.getTime() - 19.8 * 60 * 60 * 1000), // 19.8 hours ago
      thumbnailUrl: '/thumbnails/incident2.jpg',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 18 * 60 * 60 * 1000), // 18 hours ago
      tsEnd: new Date(now.getTime() - 17.5 * 60 * 60 * 1000), // 17.5 hours ago
      thumbnailUrl: '/thumbnails/incident3.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 15 * 60 * 60 * 1000), // 15 hours ago
      tsEnd: new Date(now.getTime() - 14.7 * 60 * 60 * 1000), // 14.7 hours ago
      thumbnailUrl: '/thumbnails/incident4.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Motion Detection',
      tsStart: new Date(now.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
      tsEnd: new Date(now.getTime() - 11.8 * 60 * 60 * 1000), // 11.8 hours ago
      thumbnailUrl: '/thumbnails/incident5.jpg',
      resolved: true,
    },
    {
      cameraId: cameras[2].id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 10 * 60 * 60 * 1000), // 10 hours ago
      tsEnd: new Date(now.getTime() - 9.5 * 60 * 60 * 1000), // 9.5 hours ago
      thumbnailUrl: '/thumbnails/incident6.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
      tsEnd: new Date(now.getTime() - 7.8 * 60 * 60 * 1000), // 7.8 hours ago
      thumbnailUrl: '/thumbnails/incident7.jpg',
      resolved: true,
    },
    {
      cameraId: cameras[1].id,
      type: 'Gun Threat',
      tsStart: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
      tsEnd: new Date(now.getTime() - 5.7 * 60 * 60 * 1000), // 5.7 hours ago
      thumbnailUrl: '/thumbnails/incident8.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Motion Detection',
      tsStart: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
      tsEnd: new Date(now.getTime() - 3.8 * 60 * 60 * 1000), // 3.8 hours ago
      thumbnailUrl: '/thumbnails/incident9.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[0].id,
      type: 'Unauthorised Access',
      tsStart: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      tsEnd: new Date(now.getTime() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
      thumbnailUrl: '/thumbnails/incident10.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[1].id,
      type: 'Face Recognised',
      tsStart: new Date(now.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
      tsEnd: new Date(now.getTime() - 0.8 * 60 * 60 * 1000), // 48 minutes ago
      thumbnailUrl: '/thumbnails/incident11.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[2].id,
      type: 'Motion Detection',
      tsStart: new Date(now.getTime() - 0.5 * 60 * 60 * 1000), // 30 minutes ago
      tsEnd: new Date(now.getTime() - 0.3 * 60 * 60 * 1000), // 18 minutes ago
      thumbnailUrl: '/thumbnails/incident12.jpg',
      resolved: false,
    },
  ]

  // Insert all incidents
  for (const incident of incidents) {
    await prisma.incident.create({
      data: incident,
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${cameras.length} cameras and ${incidents.length} incidents`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })