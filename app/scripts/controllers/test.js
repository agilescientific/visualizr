angular.module('visualizrApp')
	.controller('TestCtrl', function ($scope, $timeout) {

		$.getJSON( "seismic_3x2d.json", function( data ) {
			console.log(data);
			data = [data[0], data[1]];


			// Find the min and max of the entire data set
			var max = [], min = [];
			for(var i = 0; i < data.length; i++){
				for(var j = 0; j < data[i].length; j++){
					for(var k = 0; k < data[i][j].length; k++){
						max.push(data[i][j][k]);
						min.push(data[i][j][k]);
					}
				}
			}
			max = d3.max(max);
			min = d3.min(min);

			var redScale = d3.scale.linear()
				.domain([min, max])
				.range([0, 255]);

			console.log(redScale(0.5));

			var blueScale = d3.scale.linear()
				.domain([min, max])
				.range([d3.rgb(0,0,0), d3.rgb(0,0,255)]);

			var greenScale = d3.scale.linear()
				.domain([min, max])
				.range([d3.rgb(0,0,0), d3.rgb(0,255,0)]);

			var fullScale = d3.scale.linear()
				.domain([min, max])
				.range([d3.rgb(0,0,0), d3.rgb(255,255,255)]);

			var colorScale = [g3.colorScale.seismic, g3.colorScale.red_white_blue];

			var logPlot = g3.plot('.log_plot_div')
				.height(400)
				.xDomain([0, data[0].length])
				.yDomain([0, data[0][0].length])
				.draw();

			var seis = g3.seismic(logPlot, data).nDColorMap(colorScale).draw();
		});

});