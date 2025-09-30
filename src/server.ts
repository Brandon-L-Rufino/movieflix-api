import express from "express";
import { PrismaClient } from "./generated/prisma";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.get("/movies", async (req, res) => {
    const movies = await prisma.movie.findMany({
        orderBy: {
            title: "asc"
        },
        include: {
            genres: true,
            languages: true,
        }
        
    });
    res.json(movies); // agora estou buscando os filmes da tabela movies, o retorno da nossa API sera um json com todos os filmes
});

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
}); 