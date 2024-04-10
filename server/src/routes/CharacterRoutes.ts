import { FastifyInstance } from "fastify";
import { z } from "zod";

import { ICharacter } from "../entities/Character";
import { CharacterRepository } from "../repository/CharacterRepository";
import { CharacterResponse } from "../models/CharacterResponse";
import { StatusCode } from "../enums/StatusCode.enum";
import { Houses } from "../enums/Houses.enum";
import { Genders } from "../enums/Genders.enum";
import { Species } from "../enums/Species.enum";
import { BackupService } from "../services/BackupService";
import { CharactersResponse } from "../models/CharactersResponse";
import { shuffle } from "../utils/ShuffleArray";
import { CharacterShuffleResponse } from "../models/CharacterShuffleResponse";

export async function charRoutes(server: FastifyInstance) {
  const characterRepository = new CharacterRepository();

  server.post("/api/v1/security/character", async (req, reply) => {
    const charScheme = z.object({
      id: z.string().optional(),
      name: z.string().trim(),
      blood: z.string().trim().default("None"),
      born: z.string().trim().default("None"),
      species: z.string().trim().default("None"),
      gender: z.string().trim().default("None"),
      house: z.string().trim().default("None"),
      url: z.string().url().trim(),
    });

    let char = charScheme.parse(req.body) as ICharacter;

    char = await characterRepository.add(char);

    reply.code(Number(StatusCode.CREATED)).send(char);
  });

  server.post("/api/v1/security/characters", async (req, reply) => {
    const serverReply: CharacterResponse = {
      haveJustBeenAdded: [],
      haveAlreadyBeenAdded: [],
      haveNotAdded: [],
      response: {
        status: StatusCode["201"],
        code: StatusCode.CREATED,
      },
    };

    const characterScheme = z.object({
      id: z.string().optional(),
      name: z.string().trim(),
      blood: z.string().trim().default("None"),
      born: z.string().trim().default("None"),
      species: z.string().trim().default("None"),
      gender: z.string().trim().default("None"),
      house: z.string().trim().default("None"),
      url: z.string().url().trim(),
    });

    const charsScheme = z.array(characterScheme);

    let chars = charsScheme.parse(req.body) as ICharacter[];

    for (const char of chars) {
      try {
        await characterRepository.add(char, serverReply);
      } catch (error) {
        serverReply.haveNotAdded.push(char);
      }
    }

    serverReply.response.message = `Added ${serverReply.haveJustBeenAdded.length} new characters; They were not added because there were already ${serverReply.haveAlreadyBeenAdded.length} characters; ${serverReply.haveNotAdded.length} characters were not added for some unknown reason.`;
    reply.code(Number(StatusCode.CREATED)).send(serverReply);
  });

  server.get("/api/v1/security/characters/backup", async (_, reply) => {
    const serverReply: any = {
      chars: [],
      qtd: 0,
      response: {
        status: StatusCode["202"],
        code: StatusCode.ACCEPTED,
      },
    };

    const chars = await characterRepository.all();
    serverReply.chars = chars;
    serverReply.qtd = chars.length;
    new BackupService(chars).backup();
    reply.code(Number(StatusCode.ACCEPTED)).send(serverReply);
  });

  server.get("/api/v1/character/:id", async (req, reply) => {
    const paramsScheme = z.object({
      id: z.string(),
    });

    let params = paramsScheme.parse(req.params);

    const char = await characterRepository.findyById(params.id);

    if (char) {
      reply.code(Number(StatusCode.OK)).send({
        data: { char },
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      });
      return;
    }

    reply.code(Number(StatusCode.NOT_FOUND)).send({
      char,
      response: {
        status: StatusCode["404"],
        code: StatusCode.NOT_FOUND,
      },
    });
  });

  server.get("/", async (req, reply) => {
    reply.send("Server running...");
  });

  server.get(
    "/api/v1/characters",
    {
      schema: {
        summary:
          "Gets all characters that are living beings with or without pagination",
        querystring: {
          take: {
            type: "number",
            description: "Number of characters per page",
          },
          currentPage: {
            type: "number",
            description: "Page number to return characters",
          },
        },
      },
    },
    async (req, reply) => {
      const serverReply: CharactersResponse = {
        chars: [],
        pagination: {},
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      };

      const queryScheme = z.object({
        take: z.coerce.number().optional(),
        currentPage: z.coerce.number().optional(),
      });

      const query = queryScheme.parse(req.query);
      const charsResponse = await characterRepository.list(query);

      serverReply.chars = charsResponse.chars;

      if (
        query &&
        query.take !== undefined &&
        query.currentPage !== undefined
      ) {
        serverReply.pagination!.hasPagination = Boolean(query);
        serverReply.pagination!.take = query.take;
        serverReply.pagination!.currentPage = query.currentPage;
        serverReply.pagination!.totalPages = charsResponse.totalPages;
      }

      reply.send(serverReply);
    }
  );

  server.get(
    "/api/v1/characters/shuffle",
    {
      schema: {
        summary:
          "Gets the amount of characters passed in the querystring limit in a shuffled way each time",
        querystring: {
          limit: {
            type: "number",
            description: "Number max of characters to get",
          },
        },
      },
    },
    async (req, reply) => {
      const serverReply: CharacterShuffleResponse = {
        chars: [],
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      };

      const queryScheme = z.object({
        limit: z.coerce.number().optional(),
      });

      const chars = await characterRepository.listOnlyUrls();

      if (chars.length <= 0) {
        serverReply.response.status = StatusCode["204"];
        serverReply.response.code = StatusCode.NOT_FOUND;
        return reply.status(Number(StatusCode.NOT_FOUND)).send(serverReply);
      }

      const { limit = chars.length } = queryScheme.parse(req.query);
      const shuffleChars = shuffle(chars);
      serverReply.chars = shuffleChars.slice(0, limit);

      reply.send(serverReply);
    }
  );

  server.get("/api/v1/characters/urls", async (_, reply) => {
    const charsUrls = await characterRepository.listOnlyUrls();
    reply.send(charsUrls);
  });

  server.get("/api/v1/character/search/name/:name", async (req, reply) => {
    const paramsScheme = z.object({
      name: z.string(),
    });

    let params = paramsScheme.parse(req.params);

    const char = await characterRepository.findyByName(params.name);

    if (char) {
      reply.code(Number(StatusCode.OK)).send({
        data: { char },
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      });
      return;
    }

    reply.code(Number(StatusCode.NOT_FOUND)).send({
      char,
      response: {
        status: StatusCode["404"],
        code: StatusCode.NOT_FOUND,
      },
    });
  });

  server.get("/api/v1/character/search/house/:house", async (req, reply) => {
    const paramsScheme = z.object({
      house: z.enum([
        Houses.GRYFFINDOR,
        Houses.HUFFLEPUFF,
        Houses.RAVENCLAW,
        Houses.SLYTHERIN,
        Houses.NONE,
      ]),
    });

    let params = paramsScheme.parse(req.params);

    const chars = await characterRepository.findyByHouse(params.house);

    if (chars) {
      reply.code(Number(StatusCode.OK)).send({
        data: { chars },
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      });
      return;
    }

    reply.code(Number(StatusCode.NOT_FOUND)).send({
      chars,
      response: {
        status: StatusCode["404"],
        code: StatusCode.NOT_FOUND,
      },
    });
  });

  server.get("/api/v1/character/search/gender/:gender", async (req, reply) => {
    const paramsScheme = z.object({
      gender: z.enum([Genders.FEMALE, Genders.MALE, Genders.NONE]),
    });

    let params = paramsScheme.parse(req.params);

    const chars = await characterRepository.findyByGender(params.gender);

    if (chars) {
      reply.code(Number(StatusCode.OK)).send({
        data: { chars },
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      });
      return;
    }

    reply.code(Number(StatusCode.NOT_FOUND)).send({
      chars,
      response: {
        status: StatusCode["404"],
        code: StatusCode.NOT_FOUND,
      },
    });
  });

  server.get("/api/v1/character/search/specie/:specie", async (req, reply) => {
    const paramsScheme = z.object({
      specie: z.enum([
        Species.HUMAN,
        Species.BOARHOUND,
        Species.POLTERGEIST,
        Species.NONE,
      ]),
    });

    let params = paramsScheme.parse(req.params);

    const chars = await characterRepository.findyBySpecie(params.specie);

    if (chars) {
      reply.code(Number(StatusCode.OK)).send({
        data: { chars },
        response: {
          status: StatusCode["200"],
          code: StatusCode.OK,
        },
      });
      return;
    }

    reply.code(Number(StatusCode.NOT_FOUND)).send({
      chars,
      response: {
        status: StatusCode["404"],
        code: StatusCode.NOT_FOUND,
      },
    });
  });
}
