from datetime import date

DEBUG = False

api_key = ''
api_version = 'v2'

try:
    from local_settings import *
except ImportError:
    pass

today = date.today().isoformat()
api_params = {
    'api-key': api_key,
    'limit': 50,
    'filters': 'category:(-Movies)',
    'sort': 'last_chance desc',
    'date_range': '%s:%s' % (today, today)
}

api_uri = 'http://api.nytimes.com/svc/events/%s/listings' % api_version
