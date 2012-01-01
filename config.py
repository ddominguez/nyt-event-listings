#!/usr/bin/env python
from datetime import date

today = date.today().isoformat()
event_listings_key = 'YOUR_API_KEY'
event_listings_version = 'v2'
event_listing_params = {
    'api-key': event_listings_key,
    'limit': 50,
    'filters': 'category:(-Movies)',
    'sort': 'last_chance+desc',
    'date_range': '%s:%s' % (today, today)
}

params = ''
for k,v in event_listing_params.iteritems():
    params += '%s=%s&' % (k, v)

event_listing_uri  = ('http://api.nytimes.com/svc/events/%s/listings.json?%s' 
                        % (event_listings_version, params.strip('&')))
