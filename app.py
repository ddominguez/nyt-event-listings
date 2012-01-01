#!/usr/bin/env python
import json
import web
import config
import urllib2
import HTMLParser
import re

urls = (
    '/', 'index'
)

event_categories = {
    'Art': 'Art',
    'Classical': 'Classical & Opera',
    'Dance': 'Dance',
    'Jazz': 'Jazz',
    'Pop': 'Rock & Pop',
    'Theater': 'Theater',
    'spareTimes': 'Spare Times',
    'forChildren': 'For Children'
}

def get_data():
    print config.event_listing_uri
    return json.load(urllib2.urlopen(config.event_listing_uri))

def entity_decode(s):
    h = HTMLParser.HTMLParser()
    return h.unescape(replace_text(s))

def replace_text(s):
    x = {'<p>': '','</p>': ''}
    for k,v in x.iteritems():
        s = re.sub(k,v,s)
    return s

def url_encode(s):
    return urllib2.quote(s.encode('utf-8'))


class index:
    def GET(self):
        data = get_data()
        return render.index(data)


render = web.template.render('templates', globals={'entity_decode': entity_decode, 'url_encode': url_encode})
app = web.application(urls, globals())

if __name__ == '__main__':
    app.run()