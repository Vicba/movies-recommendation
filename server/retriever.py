""" This retriever class gets data from weaviate and returns it to the user. """

import weaviate
import weaviate.classes.query as wq
import weaviate.classes.config as wc
import os
import json
import requests
import pandas as pd
from typing import List, Union



class Retriever():
    def __init__(self): 
        self.client = weaviate.connect_to_local(host="weaviate", port=8080)


    # https://weaviate.io/developers/weaviate/search/basics
    # ask on forum: https://forum.weaviate.io/t/welcome-to-weaviate-community-forum/7
    # CHECK
    def get_movies(self):
        """ get movies from the database """

        if self.client is None:
            raise Exception("Client not connected")
        
        movies = self.client.collections.get("Movies")
        response = movies.query.fetch_objects(
            limit=100
        )

        movies = [{"id": o.uuid, "properties": o.properties} for o in response.objects]

        return movies
    

    # CHECK
    def get_movie_by_id(self, id: str):
        """ get a movie by its id """

        if self.client is None:
            raise Exception("Client not connected")

        # Get the collection
        movies = self.client.collections.get("Movies")
        movie = movies.query.fetch_object_by_id(id)

        return movie.properties
        

    # CHECK
    def get_movies_by_genre(self, genreId: int):
        """ get all movies of a particular genre """

        if self.client is None:
            raise Exception("Client not connected")
    
        # Get the collection
        movies = self.client.collections.get("Movies")
        response = movies.query.fetch_objects(
            filters=wq.Filter.by_property("genre_ids").contains_any([genreId]),
            limit=10,
        )

        return [{"id": o.uuid, "properties": o.properties} for o in response.objects]
    

    # CHECK
    def get_similar_movies(self, id: str, k: int = 3):
        """ get similar movies to the given movie title """

        if self.client is None:
            raise Exception("Client not connected")

        # Get the collection
        movies = self.client.collections.get("Movies")
        movie_obj = movies.query.fetch_object_by_id(
            id,
            include_vector=True
        )

        query_vector = movie_obj.vector.get("default")

        response = movies.query.near_vector(
            near_vector=query_vector,
            limit=k,
            return_metadata=wq.MetadataQuery(distance=True)
        )

        movies = [{"id": o.uuid, "properties": o.properties, "metadata": o.metadata} for o in response.objects]

        return movies


# vector search
# Get the collection
# movies = client.collections.get("Movie")

# # Perform query
# response = movies.query.near_vector(
#     near_vector=query_vector,  # A list of floating point numbers
#     limit=5,
#     return_metadata=wq.MetadataQuery(distance=True),
#     # filters=wq.Filter.by_property("release_date").greater_than(datetime(2020, 1, 1))

# )

# # Inspect the response
# for o in response.objects:
#     print(
#         o.properties["title"], o.properties["release_date"].year
#     )  # Print the title and release year (note the release date is a datetime object)
#     print(
#         f"Distance to query: {o.metadata.distance:.3f}\n"
#     )  # Print the distance of the object from the query

# client.close()

# HYBRID SEARCH
# see https://weaviate.io/developers/academy/py/starter_custom_vectors/object_searches/keyword_hybrid


    

