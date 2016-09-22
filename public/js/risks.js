(function() {
'use strict';

var app = angular.module('RiskTracker', []);
app.controller('RisksCtrl', RisksCtrl);

RisksCtrl.$inject = ['$scope', '$http'];
function RisksCtrl($scope, $http) {

  $scope.risks = [];
  $scope.riskDesc = '';

  $http.get('/api/risks').then(function(response) {
    $scope.risks = response.data.risks;
  });

  $scope.addRisk = function() {
    var desc = $scope.riskDesc.trim();
    if (desc) {
      $scope.risks.push({ desc: desc });
    }
  };

}

})();
