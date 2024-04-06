from flask import Flask, jsonify, request
from flask_cors import CORS
from retriever import Retriever
import weaviate

from build_knowledge_base.populate import create_movies_collection, import_movies_data, get_collection_length

app = Flask(__name__)

CORS(app)


retriever = Retriever()


@app.route('/')
def hello_world():
    return jsonify({'message': 'Hello, World!'})


@app.route('/populate')
def populate():
    try:
        client = weaviate.connect_to_local(host="weaviate", port=8080)

        create_movies_collection(client)
        import_movies_data(client)
        collection_length = get_collection_length(client)
        return jsonify({'message': 'Populated Weaviate!', 'collection_length': collection_length})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/check-db')
def check_db() -> str:
    try:
        client = weaviate.connect_to_local(host="weaviate", port=8080)
        collection_length = get_collection_length(client)
        return jsonify({'message': 'Connected to Weaviate!', 'collection_length': collection_length})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/get-movies')
def get_movies():
    try:
        limit_qry = request.args.get('limit')
        limit = int(limit_qry) if limit_qry else 100
        
        # Getting the query parameter, or defaulting to None
        query = request.args.get('query')

        if query:
            movies = retriever.get_movies(limit, query)
        else:
            movies = retriever.get_movies(limit)

        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-movie/<id>')
def get_movie_by_id(id: str):
    try:
        movie = retriever.get_movie_by_id(id)
        return jsonify(movie)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-movies-by-genre/<genreId>')
def get_movie_by_genre(genreId: str):
    try:
        movies = retriever.get_movies_by_genre(genreId)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/get-similar-movies/<id>')
def get_similar_movies(id: str):
    try:
        movies = retriever.get_similar_movies(id)
        return jsonify(movies)
    except Exception as e:
        return jsonify({'error': str(e)}), 500




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
