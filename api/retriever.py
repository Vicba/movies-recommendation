""" This retriever class gets data from weaviate and returns it to the user. """

import weaviate
import weaviate.classes.query as wq
import weaviate.classes.config as wc
import pandas as pd
from typing import List, Union



class Retriever():
    def __init__(self): 
        self.client = self.connect_to_weaviate()

    def connect_to_weaviate(self):
        try:
            return weaviate.connect_to_local(host="weaviate", port=8080)
        except Exception as e:
            raise Exception(f"Could not connect to Weaviate: {str(e)}")


    def get_movies(self):
        """ get movies from the database """
        
        try:
            movies = self.client.collections.get("Movies")
            response = movies.query.fetch_objects(limit=100)
            
            return [{"id": o.uuid, "properties": o.properties} for o in response.objects]
        except Exception as e:
            raise Exception(f"Could not get movies: {str(e)}")
    

    def get_movie_by_id(self, id: str):
        """ get a movie by its id """

        try:
            movies = self.client.collections.get("Movies")
            movie = movies.query.fetch_object_by_id(id)

            return movie.properties
        except Exception as e:
            raise Exception(f"Could not get movie by id: {str(e)}")
        

    def get_movies_by_genre(self, genreId: str):
        """ get all movies of a particular genre """
    
        try:
            id = int(genreId)
            movies = self.client.collections.get("Movies")
            response = movies.query.fetch_objects(
                filters=wq.Filter.by_property("genre_ids").contains_any([id]),
                limit=10,
            )

            return [{"id": o.uuid, "properties": o.properties} for o in response.objects]
        except Exception as e:
            raise Exception(f"Could not get movies by genre: {str(e)}")
    


    def get_similar_movies(self, id: str, k: int = 3):
        """ get similar movies to the given movie title """

        try:
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

            return [{"id": o.uuid, "properties": o.properties, "metadata": o.metadata} for o in response.objects]
        except Exception as e:
            raise Exception(f"Could not get similar movies: {str(e)}")

    
