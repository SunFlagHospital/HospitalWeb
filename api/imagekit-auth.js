import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default function handler(req, res) {
  try {
    const authParams =
      imagekit.getAuthenticationParameters();

    return res.status(200).json(authParams);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);

    return res.status(500).json({
      error: "Authentication failed",
    });
  }
}