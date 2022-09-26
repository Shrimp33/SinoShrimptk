from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from pypinyin import pinyin

app = Flask("")
api = Api(app)


@app.route("/")
def index():
    return "<h1>Bot is running</h1>"


class pingying(Resource):

    def get(self, a):
        a = a.replace("uplus", "+").replace("uslash",
                                            "/").replace("uequals", "=")
        response = jsonify({'response': pinyin(a)})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


api.add_resource(pingying, '/pingying/<string:a>')

app.run("0.0.0.0", 8080)
