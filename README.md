# Movie App

This is a movie app that uses 680 movies between 1990 and 2024 from TMDB stored in a vector database. The app uses a simple cosine similarity to find the most similar movies (recommendation) to a given movie.

## How to run ?

Make sure you have docker installed on your machine!

1. Clone the repo

```bash
git clone https://github.com/Vicba/movies-recommendation.git
```

2. Run `docker-compose up` in the root directory

```bash
docker-compose up
```

3. Populate the database with the movies.

```bash
curl -X GET http://localhost:5000/populate
```

4. Open `http://localhost:3000` in your browser
5. Browse around!

## Technologies

- Nextjs (typescript, Tailwindcss)
- Flask
- Weaviate
- Docker
- Huggingface API

## The embedding model

The embedding model used is `sentence-transformers/paraphrase-MiniLM-L6-v2` from huggingface. It has 384 dimensions.

If you want to use something else, you can change it in the `/api/build_knowledge_base/embed.py` file.
Run the python script to generate the csv with embeddings csv in datasets folder.

```bash
cd api/build_knowledge_base
python embed.py
```

## Learnings

- Learned how to use Weaviate
- Refresh my knowledge in nextjs & docker
- Usign huggingface API
- Project went super smooth with the research and pre-defined scope
