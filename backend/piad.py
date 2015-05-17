from flask import Flask, jsonify
from lxml import html
import requests

app = Flask(__name__)
kubernetes_url = '128.199.235.232:8080'
dockci_url = 'paas.dock.ci'


@app.route("/api/")
def index():
    result = {'Greeting': "Hello World!"}
    return jsonify(**result)

@app.route("/api/apps")
def applications():
    """
    Lists all applications by scraping DockCI
    :return:
    """
    page = requests.get('http://%s/' % dockci_url)
    tree = html.fromstring(page.text)

    applications = [
        {
            'id': a.attrib['href'][6:],
            'name': a.text
        } for a in tree.xpath('//table/tr/td/a')]

    result = {
        'data': applications
    }
    return jsonify(**result)


@app.route("/api/apps/<appid>")
def application(appid):
    """
    Collectis information on the status of one application - including current deploy and a list of historical deploys.
    :param appid:
    :return:
    """
    page = requests.get('http://%s/jobs/%s' % (dockci_url, appid))
    tree = html.fromstring(page.text)

    deploys = []
    for a in tree.xpath('//tr[@class="build-detail"]'):
        deploy = {
            'created': a[0][0].text,
            'tag': a[1].text,
            'commit': a[2].text,
            'author': a[3][0][0].text,
            'state': a[4][0].attrib['title']
        }
        deploys.append(deploy)


    first_deploy_id = [a.attrib['href'] for a in tree.xpath('//tr[@class="build-detail"]/td/a')][0]
    current_deploy = requests.get('http://%s%s.json' % (dockci_url, first_deploy_id)).json()

    # Status Handling
    # stages: Shows the current stage we are up to on the display, could be one of:
    #         start, local, git, repo, dockci, registry, chronos, kubernetes, done
    # status: Dictionary containing tick/cross for every stage, not having a key will not show anything. ie:
    #         {'repo': 'tick', 'dockci':'tick', 'registry':'cross'}
    stage = "repo"
    status = {
        'repo': 'tick',
    }

    # If you're doing docker_push then you've made it past DockCI
    if 'docker_push' in current_deploy['build_stage_slugs']:
        stage = "dockci"
        status['dockci'] = 'tick'

    # If you've made it to docker_fetch then you've done the docker_push, meaning it's in the registry!
    if 'docker_fetch' in current_deploy['build_stage_slugs']:
        stage = "registry"
        status['registry'] = 'tick'

    # TODO: This was some last minute hacky stuff - the logic works (I think) but is confusing.
    # if the overall result is in the message then check for success/fail
    if 'result' in current_deploy:
        if current_deploy['result'] == "success":
            status['dockci'] = 'tick'
            status['registry'] = 'tick'
        elif current_deploy['result'] == "error":
            # This could actually fail at registry or dockci - needs better logic here to determine. Assume fail at reg.
            stage = 'registry'
            status['dockci'] = 'tick'
            status['registry'] = 'cross'

    # TODO: Code for replication controllers is not finished - need to choose correct controller somehow and then
    #       determine the correct attribute to know whether the new services are up.
    reps = requests.get('http://%s/api/v1beta3/replicationcontrollers' % kubernetes_url, verify=False)

    rep = reps.json()['items'][0] # TODO: Choose the right rep controller

    if rep['status']['replicas'] > 0: # TODO: Check if this is the right metric for determining if it's running!
        pass
        # status = 'done'

    #Return Result
    result = {
        'current_deploy': {
            'stage': stage,
            'status': status
        },
        'deploys': deploys
    }
    return jsonify(**result)

@app.route("/api/kubernetes/nodes")
def nodes():
    """
    Passes through the kubernetes nodes endpoint
    :return:
    """
    r = requests.get('http://localhost:8080/api/v1beta3/nodes', verify=False)
    return jsonify(**r.json())

@app.route("/api/kubernetes/pods")
def pods():
    """
    Passes through the kubernetes nodes endpoint
    :return:
    """
    r = requests.get('http://localhost:8080/api/v1beta3/pods', verify=False)
    return jsonify(**r.json())


if __name__ == "__main__":
    app.debug = True
    app.run()