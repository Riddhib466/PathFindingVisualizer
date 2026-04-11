import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load ratings dataset
ratings = pd.read_csv('data/u.data', sep='\t', names=['user_id', 'movie_id', 'rating', 'timestamp'])

# Load movie titles
movies = pd.read_csv('data/u.item', sep='|', encoding='latin-1', header=None, usecols=[0,1], names=['movie_id','title'])

# Merge ratings with movie titles
data = pd.merge(ratings, movies, on='movie_id')

# Create user-movie matrix
user_movie_matrix = data.pivot_table(index='user_id', columns='title', values='rating')

# Fill NaN with 0 to calculate similarity
movie_matrix = user_movie_matrix.fillna(0)

# Compute cosine similarity between movies
similarity = cosine_similarity(movie_matrix.T)
similarity_df = pd.DataFrame(similarity, index=movie_matrix.columns, columns=movie_matrix.columns)

# Function to recommend movies
def recommend(movie_name, top_n=5):
    if movie_name not in similarity_df:
        return []
    sim_scores = similarity_df[movie_name].sort_values(ascending=False)
    sim_scores = sim_scores.drop(movie_name)  # Remove itself
    return list(sim_scores.head(top_n).index)