import { ICharacter } from "../entities/Character";

const fs = require('node:fs');
const path = require('node:path');

export class BackupService {
    #content: string | null = null;

    constructor(object: ICharacter[]) {
        this.#content = JSON.stringify(object);
    }

    backup() {
        const finalPath = path.resolve(__dirname, "..", "..", "prisma", "backup", "chars.json");

        fs.writeFile(finalPath, this.#content, 'utf8', function (err: any) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

            console.log("JSON file has been saved.");
        });
    }
}