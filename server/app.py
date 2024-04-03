from flask import Flask, jsonify
from retriever import Retriever
import weaviate

from build_knowledge_base.populate import create_movies_collection, import_movies_data, print_collection_info

app = Flask(__name__)


retriever = Retriever()


@app.route('/')
def hello_world() -> str:
    return 'Hello, World!'

# @app.route('/populate')
# def populate() -> str:
#     try:
#         client = weaviate.connect_to_local()

#         create_movies_collection(client)
#         import_movies_data(client)
#         print_collection_info(client)
#         return 'Populated!'
#     except Exception as e:
#         return str(e)
    
# @app.route('/check-db')
# def check_db() -> str:
#     try:
#         client = weaviate.connect_to_local()
#         print_collection_info(client)
#         return 'Checked!'
#     except Exception as e:
#         return str(e)
    

# CHECK
@app.route('/get-movies')
def get_movies():
    try:
        movies = retriever.get_movies()
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# CHECK
@app.route('/get-movie/<id>')
def get_movie_by_id(id: str):
    try:
        movie = retriever.get_movie_by_id(id)
        return jsonify(movie)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# CHECK
@app.route('/get-movies-by-genre/<genreId>')
def get_movie_by_genre(genreId: str):
    """ id is the genre id here """
    try:
        id = int(genreId)
        movies = retriever.get_movies_by_genre(id)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# CHECK
@app.route('/get-similar-movies/<id>')
def get_similar_movies(id: str):
    try:
        movies = retriever.get_similar_movies(id)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
