import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const id = params.id

  try {
    const incidentId = parseInt(id)

    if (isNaN(incidentId)) {
      return NextResponse.json(
        { error: 'Invalid incident ID' },
        { status: 400 }
      )
    }

    const updatedIncident = await prisma.incident.update({
      where: {
        id: incidentId,
      },
      data: {
        resolved: true,
      },
      include: {
        camera: true,
      },
    })

    return NextResponse.json(updatedIncident)
  } catch (error) {
    console.error('Error resolving incident:', error)
    return NextResponse.json(
      { error: 'Failed to resolve incident' },
      { status: 500 }
    )
  }
}
