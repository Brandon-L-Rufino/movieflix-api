import express from "express";
import { PrismaClient } from "./generated/prisma";
// import { json } from "stream/consumers";

const port = 3000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

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

app.post("/movies", async (req, res) => {

    const { title, genre_id, language_id, oscar_count, release_date } = req.body;

    try{

        // VERIFICAR NO BANCO SE JÁ EXISTE UM FILME COM O NOME QUE ESTÁ SENDO ENVIADO 

        // CASE INSENSITIVE - se a busca for feita por john wick ou JOHN WICK, o reg vai ser retornado na consulta

        // CASE SENSITIVE - se a busca por john wick e no banco estiver como John Wick, não vai ser retornado na consulta

        const movieWithSameTitle = await prisma.movie.findFirst({
            where: { 
                title: { equals: title, mode: "insensitive" }
            }, 
        });
        if (movieWithSameTitle) {
            return res
                .status(409) // ERRO JA POSSUI REG
                .send({ message: "Já existe um filme com esse título" });
        }

        await prisma.movie.create({
            data: {
                title: title,
                genre_id: genre_id,
                language_id: language_id,
                oscar_count: oscar_count,
                release_date: new Date (release_date)
            }
        }); 
    }catch(error){
        return res.status(500).send({message: "Falha ao cadastrar um filme"});
    }
    res.status(201).send();
});

app.listen(port, () => {
    console.log(`Servidor em execução em http://localhost:${port}`);
}); 