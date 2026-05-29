import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default async function handler(req, res) {
  // Ensure we return JSON
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  
  try {
    console.log('🔐 ImageKit auth request started', {
      method: req.method,
      timestamp: new Date().toISOString()
    });
    
    // Only allow POST
    if (req.method !== 'POST') {
      console.warn('⚠️ Invalid method:', req.method)
      return res.status(405).json({
        success: false,
        error: 'Method not allowed. Use POST.'
      });
    }
    
    // Validate environment variables
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY) {
      console.error('❌ Missing ImageKit credentials in environment');
      return res.status(500).json({
        success: false,
        error: 'Missing ImageKit credentials in environment'
      });
    }

    const authenticationParameters = imagekit.getAuthenticationParameters();
    
    if (!authenticationParameters || !authenticationParameters.signature) {
      console.error('❌ Failed to generate authentication parameters');
      return res.status(500).json({
        success: false,
        error: 'Failed to generate authentication parameters'
      });
    }

    console.log('✅ Auth parameters generated successfully', {
      expire: authenticationParameters.expire,
      token: authenticationParameters.token?.substring(0, 20) + '...'
    });

    const response = {
      success: true,
      token: authenticationParameters.token,
      expire: authenticationParameters.expire,
      signature: authenticationParameters.signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    };

    // Ensure response is valid JSON
    const jsonString = JSON.stringify(response);
    console.debug('📤 Sending auth response', {
      size: jsonString.length,
      statusCode: 200
    });
    
    res.status(200).json(response);
  } catch (error) {
    console.error('❌ ImageKit auth error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // Always return valid JSON even on error
    res.status(500).json({
      success: false,
      error: error.message || 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}