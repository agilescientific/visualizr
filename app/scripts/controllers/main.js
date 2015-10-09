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

		$.getJSON("seismic.json", function(data){
			console.log(data);
			var wigglePlot = g3.plot('.wiggle_plot_div')
				.height(400)
				.xDomain([-1000, 1000])
				.yDomain([0, data.data[0].length])
				.draw();
			var wig = g3.wiggle(wigglePlot, data.data)
				.skip(50)
				.xMult(0.04)
				.sampleRate(10)
				.xTrans(-800)
				.draw();

			var seismicPlot = g3.plot('.seismic_plot_div')
				.height(400)
        .xDomain([0, data.data.length - 1])
        .yDomain([0, data.data[0].length - 1])
				.draw();

			var max = data.metadata.max;
	    var colorScale = d3.scale.linear()
	    	.domain([-max, 0, max])
	    	.range(['#FF0000', '#FFF', '#0000FF']);

			var seismic = g3.seismic(seismicPlot, data.data)
			  .colorScale(colorScale)
			  .draw();

			// Get a cross section from the 2d array
		  var arr = [];
		  for(var i = 0; i < data.data.length; i++){
		    arr.push(data.data[i][0]);
		  }

		  // Grab the min and max values from the array
		  var max = d3.max(arr);
		  var min = d3.min(arr);

			var horizonPlot = g3.plot('.horizon_plot_div')
				.height(400)
        .xDomain([0, data.data.length])
        .yDomain([min, max])
        .margin(30, 40, 30, 30)
				.draw();

			var horizon = g3.horizon(horizonPlot, arr).draw();
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
