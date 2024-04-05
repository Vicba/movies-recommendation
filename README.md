# Movie App

This is a movie app that uses 680 movies between 1990 and 2024 from TMDB stored in a vector database. The app uses a simple cosine similarity to find the most similar movies (recommendation) to a given movie.

### How to run ?

Make sure you have docker installed on your machine!

1. Clone the repo

```bash
git clone https://github.com/Vicba/movies-recommendation.git
```

2. Run `docker-compose up` in the root directory

```bash
docker-compose up
```

3. Populate the database with the movies ???

```bash
docker exec -it movies-recommendation_backend_1 python populate_db.py
```

3. Open `http://localhost:3000` in your browser
4. Browse around!

## Technologies

- Nextjs (typescript, Tailwindcss)
- Flask
- Weaviate
- Docker

## Other

### Things to add

- [ ] use own embeddings
- [ ] add tv/shows
- [ ] auth

### todos

- [ ] use real data
- [ ] fix movie id page
- [ ] make movies page by genre
- [ ] make interactive
- [ ] search functionality
- [ ] embed more properties in weaviate
