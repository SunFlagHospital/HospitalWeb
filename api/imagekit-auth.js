import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default async function handler(req, res) {
  try {
    const authenticationParameters =
      imagekit.getAuthenticationParameters();

    res.status(200).json({
      token: authenticationParameters.token,
      expire: authenticationParameters.expire,
      signature: authenticationParameters.signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Authentication failed",
    });
  }
}