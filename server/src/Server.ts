import fastify from "fastify";
import multer from "fastify-multer";
import cors from "@fastify/cors";

import { charRoutes } from "./routes/CharacterRoutes";
import { env } from "process";

const server = fastify();

server.register(multer.contentParser);

server.register(cors, {
  origin: true,
});

server.register(charRoutes);

server.listen({ port: 3333, host: "192.168.1.121" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address} 🚀`);
});
