// utils/s3SimpleUpload.js
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3Client");

exports.uploadFileToS3 = async (buffer, fileName, contentType) => {
  const fileKey = `CNT_Academy/${Date.now()}-${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: buffer,
    ContentType: contentType,
  });

  try {
    await s3.send(command);
    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
};
