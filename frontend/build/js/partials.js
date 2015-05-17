(function(module) {
try {
  module = angular.module('paas-in-a-day-ui.partials');
} catch (e) {
  module = angular.module('paas-in-a-day-ui.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/404.html',
    '<div class="container"><p>FOUR OH FOR</p></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('paas-in-a-day-ui.partials');
} catch (e) {
  module = angular.module('paas-in-a-day-ui.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/app.html',
    '<div class="jumbotron"><div class="container"><div class="row" id="outer"><div id="top-section"><div id="base"></div><div id="top" ng-class="current_deploy.stage"></div><div id="status"><div id="repo" ng-class="current_deploy.status.repo"></div><div id="dockci" ng-class="current_deploy.status.dockci"></div><div id="registry" ng-class="current_deploy.status.registry"></div><div id="chronos" ng-class="current_deploy.status.chronos"></div><div id="kubernetes" ng-class="current_deploy.status.kubernetes"></div></div></div><div id="bottom-section"><div id="base"></div><div id="top" ng-class="current_deploy.stage"></div></div></div></div></div><div class="container"><div class="row"><div class="col-sm-12"><table class="table table-striped"><thead><th>Created At</th><th>Tag</th><th>Commit</th><th>Author</th><th>State</th></thead><tbody><tr ng-repeat="deploy in deploys"><td>{{ deploy.created }}</td><td>{{ deploy.tag }}</td><td>{{ deploy.commit }}</td><td>{{ deploy.author }}</td><td>{{ deploy.state }}</td></tr></tbody></table></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('paas-in-a-day-ui.partials');
} catch (e) {
  module = angular.module('paas-in-a-day-ui.partials', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/home.html',
    '<div class="jumbotron"><div class="container"><h1>Welcome to PaaS in a Day!</h1><p>PIAD is git push to server in one.five days!</p></div></div><div class="container"><div class="row"><div class="col-sm-12"><h2 class="first-header">Applications</h2><table class="table table-striped" data-ng-hide="loading"><thead><tr><th>Application</th></tr></thead><tbody><tr ng-repeat="app in apps"><td><a ui-sref="^.app({appId:app.id})">{{ app.name }}</a></td></tr><tr ng-hide="apps"><td><small>You don\'t have any apps! Where are they?!</small></td></tr></tbody></table></div></div></div>');
}]);
})();
