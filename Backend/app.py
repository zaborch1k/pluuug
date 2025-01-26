from flask import Flask, request
from url_worker.prepare_url import prepare_url
import ydf

app = Flask(__name__)

@app.route("/neuralnetwork", methods=["GET"])
def getRoot():
  url = request.args.get("url")
  prepared_url = prepare_url(url)

  model = ydf.load_model("model")
  result = model.predict(prepared_url)

  return result.tolist()