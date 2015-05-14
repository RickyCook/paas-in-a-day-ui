# PaaS in a Day!
A simple GUI to view the progress of an application being deployed on the PIAD stack.

## Howto

### frontend

- fetch node_modules
-- npm update
- fetch bower_components
-- ./node_modules/bower/bin/bower update
- Start a gulp task that compiles the code into frontend/build, and watches for code changes.
-- ./node_modules/gulp/bin/gulp.js

### backend

- virtualenv env
- source ./env/bin/activate
- pip install -r requirements.txt
- python piad.py

### nginx

- Create a domain piad.com in your hosts file pointing to the server. (127.0.0.1 for dev)
- sudo nginx -c ~/code/paas-in-a-day-ui/proxy/nginx.conf