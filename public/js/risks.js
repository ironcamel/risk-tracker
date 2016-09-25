(function() {
'use strict';

var app = angular.module('RiskTracker', []);
app.controller('RisksCtrl', RisksCtrl);

function RisksCtrl($http) {

  this.risks = [];
  this.riskDesc = '';

  var _this = this;
  $http.get('/api/risks').then(function(response) {
    _this.risks = response.data.risks;
  });

  this.addRisk = function() {
    var desc = this.riskDesc.trim();
    if (desc) {
      this.risks.push({ desc: desc });
    }
  };

}

})();
