from flask import Flask, jsonify
from lxml import html
import requests

app = Flask(__name__)

@app.route("/api/")
def index():
    result = {'Greeting': "Hello World!"}
    return jsonify(**result)

@app.route("/api/apps")
def apps():
    page = requests.get('http://paas.dock.ci/')
    tree = html.fromstring(page.text)

    apps = [
        {
            'id': a.attrib['href'][6:],
            'name': a.text
        } for a in tree.xpath('//table/tr/td/a')]

    result = {
        'data': apps
    }
    return jsonify(**result)


@app.route("/api/pipeline/deploys")
def deploys():
    result = {
        'data': [
            {
                'commit': {
                    'hash': '81dfb16b33ec2671af9abd6c2b290644a6b23e14',
                    'author': 'adam@macleod.id.au'
                },
                'git': {
                    'status': 'Complete',
                    'detailed': 'Git More information'
                },
                'repo': {
                    'status': 'Complete',
                    'detailed': 'Repo More information'
                },
                'dockci': {
                    'status': 'Complete',
                    'detailed': 'DockCI More information'
                },
                'registry': {
                    'status': 'Complete',
                    'detailed': 'Registry More information'
                },
                'chronos': {
                    'status': 'Complete',
                    'detailed': 'Chronos More information'
                },
                'kubernetes': {
                    'status': 'Pending',
                    'detailed': 'Kubernetes More information'
                }
            },
            {
                'commit': {
                    'hash': '9093d90f87dc33aa3609160872acccc36ce950a1',
                    'author': 'ricky@thatpanda.com'
                },
                'git': {
                    'status': 'Complete',
                    'detailed': 'More information'
                },
                'repo': {
                    'status': 'Complete',
                    'detailed': 'More information'
                },
                'dockci': {
                    'status': 'Complete',
                    'detailed': 'More information'
                },
                'registry': {
                    'status': 'Complete',
                    'detailed': 'More information'
                },
                'chronos': {
                    'status': 'Complete',
                    'detailed': 'More information'
                },
                'kubernetes': {
                    'status': 'Pending',
                    'detailed': 'More information'
                }
            }
        ]
    }
    return jsonify(**result)

@app.route("/api/kubernetes/nodes")
def nodes():
    r = requests.get('http://localhost:8080/api/v1beta3/nodes', verify=False)
    return jsonify(**r.json())

@app.route("/api/kubernetes/pods")
def pods():
    r = requests.get('http://localhost:8080/api/v1beta3/pods', verify=False)
    return jsonify(**r.json())


if __name__ == "__main__":
    app.run()