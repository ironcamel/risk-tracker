(function() {
'use strict';

var app = angular.module('RiskTracker', ['ngRoute']);
app.controller('MainCtrl', RisksCtrl);
app.controller('RisksCtrl', RisksCtrl);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl : '/home.html',
      controller  : 'MainCtrl'
  })
  .when('/about', {
      templateUrl : '/about.html',
      controller  : 'MainCtrl'
  })
  .when('/risks', {
      templateUrl : '/risks.html',
      controller  : 'RisksCtrl as risks'
  });
});

function MainCtrl($http) {
}

function RisksCtrl($http) {

  var me = this;
  me.risks = [];
  me.riskDesc = '';

  $http.get('/api/risks').then(function(response) {
    me.risks = response.data.risks;
  });

  me.addRisk = function() {
    var desc = me.riskDesc.trim();
    if (!desc) return;

    var data = { desc: desc };
    $http.post('/api/risks', data).then(function(res) {
      me.risks.push(data);
      me.riskDesc = '';
    });
  };

}

})();
