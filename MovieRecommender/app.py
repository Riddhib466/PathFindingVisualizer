from flask import Flask, request, render_template
from recommender import recommend

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    recommended = []
    movie_name = ""
    if request.method == 'POST':
        movie_name = request.form.get('movie')
        recommended = recommend(movie_name)
    return render_template('index.html', recommendations=recommended, movie_name=movie_name)

if __name__ == '__main__':
    app.run(debug=True)