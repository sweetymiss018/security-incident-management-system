import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // const { id } = await params;
  try {
     const { id } = await params;
    
    // Validate ID
    if (!id) {
      return NextResponse.json(
        { error: 'Incident ID is required' }, 
        { status: 400 }
      );
    }

    const updatedIncident = await prisma.incident.update({
      where: {
        id: parseInt(id),
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