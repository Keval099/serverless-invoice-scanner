import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
});

export const uploadInvoiceHandler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const fileName = body.fileName;

    const fileContent = body.fileContent;

    const buffer = Buffer.from(fileContent, "base64");

    await s3.send(
      new PutObjectCommand({
        Bucket: "keval-invoice-scanner-2026",
        Key: fileName,
        Body: buffer,
      })
    );

    return {
      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        message: "File uploaded successfully",
      }),
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,

      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        message: "Upload failed",
      }),
    };
  }
};