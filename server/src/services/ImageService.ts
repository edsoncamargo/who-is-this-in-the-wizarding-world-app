const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');

import S3StorageService from "./S3StorageService";

export class ImageService {
    async download(url: string, id: string): Promise<{ pathFile: string, filename: string }> {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        const filename = id;
        const pathFile = path.resolve(__dirname, '..', '..', 'tmp', `${filename}.jpg`);

        path.resolve();

        const writer = await fs.createWriteStream(pathFile);

        response.data.pipe(writer);

        return await new Promise((resolve) => {
            writer.on('finish', () => {
                resolve({
                    pathFile, filename
                });
            });
        });
    }

    async upload(pathFile: string, filename: string) {
        const service = new S3StorageService();
        const url = await service.saveFile(pathFile, filename);
        return url;
    }
}