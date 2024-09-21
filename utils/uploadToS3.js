const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("./s3Client");

exports.uploadFile = async (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Your bucket name
    Key: `CNT_Academy/${file.name}`, // File name you want to save as in S3
    Body: file.data, // File buffer
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
    console.log("File uploaded successfully:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.log("Error uploading file:", error);
    throw error;
  }
};
