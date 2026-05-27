/**
 * ImageKit Authentication Endpoint
 * Vercel Serverless Function
 * 
 * This generates secure authentication tokens for ImageKit uploads
 * Private key is kept secure on the server (never exposed to frontend)
 */

import crypto from 'crypto'

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get credentials from environment (Vercel secrets)
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_KEY

    // Validate credentials exist
    if (!privateKey || !publicKey) {
      console.error('❌ Missing ImageKit credentials in environment variables')
      return res.status(500).json({
        error: 'ImageKit credentials not configured on server',
        details: `privateKey: ${privateKey ? 'set' : 'missing'}, publicKey: ${publicKey ? 'set' : 'missing'}`
      })
    }

    // Generate authentication parameters
    const timestamp = Math.floor(Date.now() / 1000) // Current Unix timestamp
    const expire = timestamp + 3600 // Token expires in 1 hour (3600 seconds)

    // Create signature
    // ImageKit signature = HMAC-SHA1(privateKey, `${publicKey}${expire}`)
    const signatureString = `${publicKey}${expire}`
    const signature = crypto
      .createHmac('sha1', privateKey)
      .update(signatureString)
      .digest('base64')

    console.log('✅ ImageKit auth token generated successfully', {
      timestamp,
      expire,
      publicKey: publicKey.substring(0, 10) + '...',
      signatureLength: signature.length
    })

    // Return authentication parameters
    return res.status(200).json({
      token: publicKey,
      expire,
      signature,
      timestamp
    })
  } catch (error) {
    console.error('❌ ImageKit auth error:', error)
    return res.status(500).json({
      error: 'Failed to generate authentication token',
      message: error.message
    })
  }
}
