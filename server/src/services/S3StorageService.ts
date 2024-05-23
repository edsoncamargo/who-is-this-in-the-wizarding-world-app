import aws, { S3 } from "aws-sdk";
import path from "node:path";
const fs = require("node:fs");

class S3StorageService {
  private client: S3 | null;

  constructor() {
    this.client = null;

    try {
      this.client = new aws.S3({
        region: "sa-east-1",
      });
    } catch (error) {
      console.error("Erro ao criar cliente S3:", error);
    }
  }

  async saveFile(pathFile: string, filename: string): Promise<string> {
    const fileContent = await fs.promises.readFile(path.resolve(pathFile));

    this.client!.putObject({
      Bucket: "quiz-chp-chars",
      Key: filename,
      ACL: "public-read",
      Body: fileContent,
      ContentType: "image/jpeg",
    }).promise();

    await fs.promises.unlink(pathFile);
    return `https://quiz-chp-chars.s3.sa-east-1.amazonaws.com/${filename}`;
  }
}

export default S3StorageService;
