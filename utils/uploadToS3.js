const {
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = require("./s3Client");

const initiateMultipartUpload = async (fileName, contentType) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `CNT_Academy/${Date.now()}-${fileName}`,
    ContentType: contentType,
  };

  try {
    const command = new CreateMultipartUploadCommand(params);
    const response = await s3.send(command);
    return {
      uploadId: response.UploadId,
      fileKey: response.Key,
    };
  } catch (error) {
    console.error("Error initiating multipart upload:", error);
    throw error;
  }
};

const generatePresignedUrls = async (fileKey, uploadId, partsCount) => {
  try {
    const presignedUrls = [];
    for (let partNumber = 1; partNumber <= partsCount; partNumber++) {
      const command = new UploadPartCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileKey,
        UploadId: uploadId,
        PartNumber: partNumber,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      presignedUrls.push(url);
    }
    return presignedUrls;
  } catch (error) {
    console.error("Error generating presigned URLs:", error);
    throw error;
  }
};

const completeMultipartUpload = async (fileKey, uploadId, parts) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    UploadId: uploadId,
    MultipartUpload: {
      Parts: parts,
    },
  };

  try {
    const command = new CompleteMultipartUploadCommand(params);
    const response = await s3.send(command);
    return response.Location;
  } catch (error) {
    console.error("Error completing multipart upload:", error);
    throw error;
  }
};

// New endpoint to initialize multipart upload
exports.initiateVideoUpload = async (req, res) => {
  try {
    const { fileName, contentType } = req.body;
    const { uploadId, fileKey } = await initiateMultipartUpload(
      fileName,
      contentType
    );

    res.status(200).json({
      success: true,
      uploadId,
      fileKey,
    });
  } catch (error) {
    console.error("Initiate upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate video upload",
    });
  }
};

// New endpoint to generate presigned URLs for chunks
exports.generateUploadUrls = async (req, res) => {
  try {
    const { fileKey, uploadId, partsCount } = req.body;
    const presignedUrls = await generatePresignedUrls(
      fileKey,
      uploadId,
      partsCount
    );

    res.status(200).json({
      success: true,
      presignedUrls,
    });
  } catch (error) {
    console.error("Generate URLs error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate upload URLs",
    });
  }
};

// New endpoint to complete the upload
exports.completeVideoUpload = async (req, res) => {
  try {
    const { fileKey, uploadId, parts } = req.body;
    const videoUrl = await completeMultipartUpload(fileKey, uploadId, parts);

    res.status(200).json({
      success: true,
      videoUrl,
    });
  } catch (error) {
    console.error("Complete upload error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to complete video upload",
    });
  }
};
