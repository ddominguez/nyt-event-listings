import os
from datetime import date

DEBUG = os.environ.get('FlASK_DEBUG', False)  # add environment variable
HOST = ''

api_key = os.environ.get('NYT_API_KEY', '')  # add environment variable
api_version = 'v2'

today = date.today().isoformat()
api_params = {
    'api-key': api_key,
    'limit': 50,
    'filters': 'category:(-Movies),last_chance:true',
    'sort': 'last_chance desc',
    'date_range': '%s:%s' % (today, today)
}

api_uri = 'http://api.nytimes.com/svc/events/%s/listings' % api_version
