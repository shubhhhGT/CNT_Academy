const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const ffmpeg = require("fluent-ffmpeg");
const s3 = require("./s3Client");

// Helper function to get a signed URL from S3
const getSignedUrlFromS3 = async (params) => {
  const command = new GetObjectCommand(params);
  return getSignedUrl(s3, command, { expiresIn: 3600 }); // URL expires in 1 hour
};

// Function to get video duration from S3 using ffprobe
async function getVideoDurationFromS3(params) {
  const url = await getSignedUrlFromS3(params); // Get signed URL for the video

  return new Promise((resolve, reject) => {
    ffmpeg(url).ffprobe((err, data) => {
      if (err) return reject(err); // Handle errors
      resolve(data.format.duration); // Return video duration
    });
  });
}

module.exports = getVideoDurationFromS3;
