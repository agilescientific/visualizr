'use strict';

angular.module('visualizrApp')
	.controller('MainCtrl', function ($scope) {

		// Well Log 
		$.getJSON("seismic.json", function(data) {
			//$scope.logData = logData;
			// G3.logPlot(logData, ".seis_plot", true, "Vp");
			// G3.logPlot(logData, ".seis_plot", false, "Vs");	
			// G3.logPlot(logData, ".seis_plot", false, "p");
			// G3.logPlot(logData, ".seis_plot", false, "Evan");
			//G3.logPlot(logData, ".seis_plot", false, "matt");	
			var max = findMax(data.metadata.max, data.metadata.min);
			var options = {
				xDomain: [data.geometry.xline_min, data.geometry.xline_max],
				yDomain: [data.z.min, data.z.max],
				max: max,
				gain: 20,
				skip: 20, 
				height: 500
			}
			g3.wiggle.init(data, ".seis_plot", options);
			// $scope.wiggle.draw();
			//console.log(gg);
		});

		$scope.update = function(){
			//g3.wiggle.update($scope.logData, ".seis_plot", null, $scope.height, $scope.skip, $scope.gain);
		};
	});
