import os
import json
import requests
import pandas as pd
import datetime
from dotenv import load_dotenv
from tqdm import tqdm
from weaviate.util import generate_uuid5
import weaviate
import weaviate.classes.config as wc

# Load environment variables
load_dotenv()



def create_movies_collection(client):
    # check if the schema already exists
    if client.collections.exists("Movies"):
        client.collections.delete("Movies")
        print("Deleted the existing 'Movies' schema")

    # Create collection 'Movies'
    client.collections.create(
        name="Movies",
        properties=[
            wc.Property(name="title", data_type=wc.DataType.TEXT),
            wc.Property(name="backdrop_path", data_type=wc.DataType.TEXT),
            wc.Property(name="poster_path", data_type=wc.DataType.TEXT),
            wc.Property(name="overview", data_type=wc.DataType.TEXT),
            wc.Property(name="vote_average", data_type=wc.DataType.NUMBER),
            wc.Property(name="genre_ids", data_type=wc.DataType.INT_ARRAY),
            wc.Property(name="release_date", data_type=wc.DataType.DATE),
            wc.Property(name="popularity", data_type=wc.DataType.NUMBER),
            wc.Property(name="tmdb_id", data_type=wc.DataType.INT),
        ],
        vectorizer_config=wc.Configure.Vectorizer.none(),
    )



def import_movies_data(client):
    if os.path.exists("./datasets/movies_data_1990_2024.csv"):
        df = pd.read_csv("./datasets/movies_data_1990_2024.csv")

    # TODO : make my own embeddings of the data
    embs_url = "https://raw.githubusercontent.com/weaviate-tutorials/edu-datasets/main/movies_data_1990_2024_embeddings.csv"
    emb_df = pd.read_csv(embs_url)

    # Get the collection
    movies = client.collections.get("Movies")

    with movies.batch.dynamic() as batch:
        # Loop through the data
        for i, movie in tqdm(enumerate(df.itertuples(index=False)), desc="Importing Movies"):
            release_date = datetime.datetime.strptime(movie.release_date, "%Y-%m-%d").replace(tzinfo=datetime.timezone.utc)
            genre_ids = json.loads(movie.genre_ids)

            movie_obj = {
                "title": movie.title,
                "backdrop_path": movie.backdrop_path,
                "poster_path": movie.poster_path,
                "overview": movie.overview,
                "vote_average": movie.vote_average,
                "genre_ids": genre_ids,
                "release_date": release_date,
                "popularity": movie.popularity,
                "tmdb_id": movie.id,
            }

            # Get the vector
            vector = emb_df.iloc[i].to_list()

            # add object, vector to batch queue
            batch.add_object(
                properties=movie_obj,
                uuid=generate_uuid5(movie.id),
                vector=vector
            )

    # Check if any objects failed to import
    if len(client.collections.get("Movies").batch.failed_objects) > 0:
        print(f"Failed to import {len(client.collections.get('Movies').batch.failed_objects)} objects")


def print_collection_info(client):
    movies = client.collections.get("Movies")
    i = 0
    for item in movies.iterator(include_vector=True):
        if i > 3:
            break
        print(item.uuid, item.properties, item.vector)
        i += 1

    # get length of collection
    items = [item for item in movies.iterator()]
    print(f"Number of items in the collection: {len(items)}")
