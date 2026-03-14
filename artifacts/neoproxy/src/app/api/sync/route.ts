import { NextRequest, NextResponse } from 'next/server'

interface SyncData {
  deviceId: string
  environment: 'termux' | 'windsurf' | 'mobile'
  timestamp: number
  data: {
    files?: Array<{ path: string, content: string, modified: number }>
    commands?: Array<{ command: string, result: string, timestamp: number }>
    status?: string
    location?: string
  }
}

// In-memory storage for demo (replace with database in production)
const syncStore = new Map<string, SyncData>()

export async function POST(request: NextRequest) {
  try {
    const syncData: SyncData = await request.json()
    
    // Validate required fields
    if (!syncData.deviceId || !syncData.environment) {
      return NextResponse.json(
        { error: 'Missing required fields: deviceId, environment' },
        { status: 400 }
      )
    }

    // Add timestamp if not provided
    syncData.timestamp = syncData.timestamp || Date.now()

    // Store sync data
    syncStore.set(syncData.deviceId, syncData)

    console.log(`Sync received from ${syncData.environment} (${syncData.deviceId})`)
    
    // Broadcast to other connected devices (WebSocket implementation would go here)
    broadcastSync(syncData)

    return NextResponse.json({ 
      success: true, 
      timestamp: syncData.timestamp,
      message: 'Data synchronized successfully'
    })

  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const deviceId = searchParams.get('deviceId')
  const environment = searchParams.get('environment')

  if (deviceId) {
    // Get specific device data
    const data = syncStore.get(deviceId)
    return NextResponse.json({ data: data || null })
  }

  if (environment) {
    // Get all devices for specific environment
    const devices = Array.from(syncStore.values())
      .filter(device => device.environment === environment)
    return NextResponse.json({ devices })
  }

  // Get all sync data
  const allData = Array.from(syncStore.values())
  return NextResponse.json({ devices: allData })
}

// Mock broadcast function (implement WebSocket for real-time)
function broadcastSync(syncData: SyncData) {
  console.log(`Broadcasting sync from ${syncData.environment}:`, {
    deviceId: syncData.deviceId,
    timestamp: syncData.timestamp,
    dataKeys: Object.keys(syncData.data)
  })
}
