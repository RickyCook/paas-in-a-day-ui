from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/api/")
def index():
    result = {'Greeting': "Hello World!"}
    return jsonify(**result)

if __name__ == "__main__":
    app.run()