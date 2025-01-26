import pandas as pd
from url_worker.utility import *

def prepare_url(url):
    url = url.split('?')[0]

    data= pd.DataFrame()

    data["url"] = pd.Series(url)

    data["url_len"] = data["url"].apply(lambda x: len(str(x)))

    data["domain"] = data["url"].apply(lambda i: process_tld(i))

    feature = {
      "at": '@',
      "question": '?',
      "dash": '-',
      "equal": '=',
      "dot": '.',
      "hashtag": '#',
      "percent": '%',
      "plus": '+',
      "dollar": '$',
      "exclaim": '!',
      "asterisk": '*',
      "comma": ',',
      "protocol": "//"
    }

    for a in feature:
      data[a] = data["url"].apply(lambda i: i.count(feature[a]))

    data["abnormal_url"] = data["url"].apply(lambda i: abnormal_url(i))

    data["https"] = data["url"].apply(lambda i: httpSecure(i))

    data["digits"]= data["url"].apply(lambda i: digit_count(i))
    data["letters"]= data["url"].apply(lambda i: letter_count(i))
    
    data["shortening_service"] = data["url"].apply(lambda x: shortening_service(x))
    
    prepared_data = data.drop(["url", "domain"], axis=1)

    return prepared_data