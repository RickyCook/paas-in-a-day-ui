# PaaS in a Day!
A simple GUI to view the progress of an application being deployed on the PIAD stack.

## Howto

### frontend

- npm update
- ./node_modules/bower/bin/bower update
- ./node_modules/gulp/bin/gulp.js

The frontend is an angular project that resides inside of frontend/app, when you run gulp it builds all the assets and
pushes them into frontend/build, this directory is then served by nginx config inside of proxy/nginx.conf.

### backend

- virtualenv env
- source ./env/bin/activate
- pip install -r requirements.txt
- python piad.py

Nginx expects this to be on localhost:5000

### nginx

- add piad.com to your hosts file to point at localhost
- `sudo nginx -c ~/code/paas-in-a-day-ui/proxy/nginx.conf` to run nginx

### Kubernetes endpoint

- Grab host from https://github.com/RickyCook/paas-in-a-day/blob/master/ansible/hosts.ini
- ssh -f root@128.199.235.232 -L 8080:root@128.199.235.232:8080 -N