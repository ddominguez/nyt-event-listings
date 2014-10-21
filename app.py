import requests
import settings
from flask import Flask, render_template

app = Flask(__name__)
app.config['DEBUG'] = settings.DEBUG


@app.route("/")
def index():
    r = requests.get(settings.api_uri, params=settings.api_params)
    data = r.json()
    return render_template(
        'index.html',
        events=data['results']
    )


if __name__ == "__main__":
    app.run()
