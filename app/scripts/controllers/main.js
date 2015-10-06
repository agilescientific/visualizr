'use strict';

angular.module('visualizrApp')
	.controller('MainCtrl', function ($scope, $routeParams, $timeout) {
		var myPlot = g3.plot('.plot_div')
			.height(200)
			.xDomain([0, 500])
			.yDomain([0, 300])
			.draw();

		$.getJSON( "well_log.json", function( data ) {
			var logPlot = g3.plot('.log_plot_div')
				.height(400)
				.xDomain([0, 300])
				.yDomain([0, data.data.length])
				.draw();
			var log = g3.log(logPlot, data.data).draw();
			var log2 = g3.log(logPlot, data.data)
				.color("black")
				.xMult(0.50)
				.xTrans(200)
				.draw();
		});

		$scope.scrollTo = function(selector){
        if(jQuery('#' + selector).length == 1){
          console.log(jQuery('#' + selector).offset().top);
          jQuery('html, body').animate({
            scrollTop:  jQuery('#' + selector).position().top
          });
        };
      }
      if(typeof $routeParams.page !== 'undefined' && $routeParams.page.length > 0){
       $timeout(function() { $scope.scrollTo($routeParams.page) }, 1);
      }
	});
