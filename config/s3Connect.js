const { HeadBucketCommand } = require("@aws-sdk/client-s3");
const s3 = require("../utils/s3Client"); // Reuse the shared S3 client

exports.s3Connect = async () => {
  try {
    const bucketName = process.env.S3_BUCKET_NAME;

    // Check if the bucket exists using HeadBucketCommand
    const command = new HeadBucketCommand({ Bucket: bucketName });
    await s3.send(command);

    console.log(`Successfully connected to bucket: ${bucketName}`);
  } catch (error) {
    console.log("Error connecting to S3:", error.message || error);
  }
};
