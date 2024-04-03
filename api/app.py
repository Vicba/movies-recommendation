from flask import Flask, jsonify
from retriever import Retriever
import weaviate

from build_knowledge_base.populate import create_movies_collection, import_movies_data, get_collection_length

app = Flask(__name__)


retriever = Retriever()


@app.route('/')
def hello_world() -> str:
    return 'Hello, World!'


@app.route('/populate')
def populate() -> str:
    try:
        client = weaviate.connect_to_local(host="weaviate", port=8080)

        create_movies_collection(client)
        import_movies_data(client)
        collection_length = get_collection_length(client)
        return f'Populated Weaviate! Collection length: {collection_length}'
    except Exception as e:
        return str(e)
    

@app.route('/check-db')
def check_db() -> str:
    try:
        client = weaviate.connect_to_local(host="weaviate", port=8080)
        collection_length = get_collection_length(client)
        return f'Connected to Weaviate! Collection length: {collection_length}'
    except Exception as e:
        return str(e)
    

@app.route('/get-movies')
def get_movies():
    try:
        movies = retriever.get_movies()
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 
@app.route('/get-movie/<id>')
def get_movie_by_id(id: str):
    try:
        movie = retriever.get_movie_by_id(id)
        return jsonify(movie)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 
@app.route('/get-movies-by-genre/<genreId>')
def get_movie_by_genre(genreId: str):
    try:
        movies = retriever.get_movies_by_genre(genreId)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# 
@app.route('/get-similar-movies/<id>')
def get_similar_movies(id: str):
    try:
        movies = retriever.get_similar_movies(id)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
