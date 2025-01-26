from tld import get_tld
from urllib.parse import urlparse
import re

def process_tld(url):
  try:
    res = get_tld(url, as_object = True, fail_silently=False,fix_protocol=True)
    pri_domain = res.parsed_url.netloc
  except :
    pri_domain= None

  return pri_domain

def abnormal_url(url):
  try:
    hostname = urlparse(url).hostname
    hostname = str(hostname)
    match = re.search(hostname, url)

    if match:
      return 1
    else:
      return 0
  except:
    return 0
  
def httpSecure(url):
  protocol = urlparse(url).scheme
  match = str(protocol)

  if match=="https":
    return 1
  else:
    return 0
  
def digit_count(url):
  digits = 0

  for i in url:
    if i.isnumeric():
      digits = digits + 1

  return digits

def letter_count(url):
  letters = 0

  for i in url:
    if i.isalpha():
      letters = letters + 1

  return letters

def shortening_service(url):
  match = re.search(
    """bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|
    yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|
    short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|
    doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|
    db\.tt|qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|
    q\.gs|is\.gd|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|
    x\.co|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|
    tr\.im|link\.zip\.net""",
    url
  )

  if match:
    return 1
  else:
    return 0