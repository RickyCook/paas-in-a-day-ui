# PaaS in a Day!
A simple GUI to view the progress of an application being deployed on the PIAD stack.

## Howto

### frontend

- npm update
- ./node_modules/bower/bin/bower update
- ./node_modules/gulp/bin/gulp.js

### backend

- virtualenv env
- source ./env/bin/activate
- pip install -r requirements.txt
- python piad.py

### nginx

- add piad.com to your hosts file to point at localhost
- `sudo nginx -c ~/code/paas-in-a-day-ui/proxy/nginx.conf` to run nginx

### Kubernetes endpoint

- Grab host from https://github.com/RickyCook/paas-in-a-day/blob/master/ansible/hosts.ini
- ssh -f root@128.199.235.232 -L 8080:root@128.199.235.232:8080 -N