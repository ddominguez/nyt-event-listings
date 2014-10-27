import json
import requests
import settings
from flask import Flask, render_template

app = Flask(__name__)
app.debug = settings.DEBUG


@app.route("/")
def index():
    r = requests.get(settings.api_uri, params=settings.api_params)
    data = r.json()
    return render_template(
        'index.html',
        events=json.dumps(data['results'])
    )


if __name__ == "__main__":
    if settings.DEBUG:
        settings.HOST = '0.0.0.0'
    app.run(host=settings.HOST)
