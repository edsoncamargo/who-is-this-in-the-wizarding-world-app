import GenerateUniqueID from "../utils/GenerateUniqueID";

import { ICharacter } from "../entities/Character";
import { ImageService } from "../services/ImageService";

import { prisma } from "../config/Prisma";
import { CharacterResponse } from "../models/CharacterResponse";
import { CharacterShuffle } from "../models/CharacterShuffle";

export class CharacterRepository {
    imageService = new ImageService();

    constructor() { }

    async add(character: ICharacter | any, serverReply?: CharacterResponse): Promise<ICharacter> {
        character.id = GenerateUniqueID(character.name);

        const responseChar = await prisma.character.findUnique({
            where: {
                id: character.id,
            }
        })

        if (!responseChar) {
            const {
                pathFile, filename
            } = await this.imageService.download(character.url, character.id);
            const url = await this.imageService.upload(pathFile, filename);
            character.url = url;

            serverReply?.data.haveJustBeenAdded.push(character);
            return await prisma.character.create({
                data: character
            });
        }

        serverReply?.data.haveAlreadyBeenAdded.push(character);
        return Promise.resolve(character);
    }

    async list(query?: { take?: number | undefined, currentPage?: number | undefined }): Promise<any> {
        let take = undefined;
        let skip = undefined;

        const total = await prisma.character.count({
            where: {
                gender: {
                    not: "None"
                }
            }
        });

        let totalPages = undefined;

        if (Boolean(query) && (query?.take !== undefined) && (query?.currentPage !== undefined)) {
            totalPages = Math.trunc(total / query!.take!) + 1;
            take = query!.take!;
            skip = (Math.trunc(query!.take! * (query!.currentPage! - 1)));
        }

        const wrapper = {
            chars: await prisma.character.findMany({
                take,
                skip,
                where: {
                    gender: {
                        not: "None"
                    }
                }
            }),
            totalPages
        }

        return wrapper;
    }

    async all(): Promise<ICharacter[]> {
        return await prisma.character.findMany();
    }

    async listOnlyUrls(): Promise<CharacterShuffle[]> {
        return await prisma.character.findMany({
            select: {
                id: true,
                name: true,
                url: true,
            },
            where: {
                gender: {
                    not: "None"
                }
            }
        });
    }

    async findyById(id: string): Promise<ICharacter | null> {
        return await prisma.character.findUnique({
            where: {
                id
            }
        });
    }

    async findyByName(name: string): Promise<ICharacter[] | []> {
        return await prisma.character.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }
        });
    }

    async findyByHouse(house: string): Promise<ICharacter[] | []> {
        return await prisma.character.findMany({
            where: {
                house
            }
        });
    }

    async findyByGender(gender: string): Promise<ICharacter[] | []> {
        return await prisma.character.findMany({
            where: {
                gender
            }
        });
    }

    async findyBySpecie(species: string): Promise<ICharacter[] | []> {
        return await prisma.character.findMany({
            where: {
                species
            }
        });
    }
}