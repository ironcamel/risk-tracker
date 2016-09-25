(function() {
'use strict';

var app = angular.module('RiskTracker', []);
app.controller('RisksCtrl', RisksCtrl);

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
    });
  };

}

})();
