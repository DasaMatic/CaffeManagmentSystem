   
    var chartData = generateChartData();

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true
        },
        "dataProvider": chartData,
        "synchronizeGrid":true,
        "valueAxes": [{
            "id":"v1",
            "axisColor": "#FF6600",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "left"
        }, {
            "id":"v2",
            "axisColor": "#FCD202",
            "axisThickness": 2,
            "axisAlpha": 1,
            "position": "right"
        }, {
            "id":"v3",
            "axisColor": "#B0DE09",
            "axisThickness": 2,
            "gridAlpha": 0,
            "offset": 50,
            "axisAlpha": 1,
            "position": "left"
        }],
        "graphs": [{
            "valueAxis": "v1",
            "lineColor": "#FF6600",
            "bullet": "round",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "red line",
            "valueField": "input",
            "fillAlphas": 0
        }, {
            "valueAxis": "v2",
            "lineColor": "#FCD202",
            "bullet": "square",
            "bulletBorderThickness": 1,
            "hideBulletsCount": 30,
            "title": "yellow line",
            "valueField": "output",
            "fillAlphas": 0
        }],
        "chartScrollbar": {},
        "chartCursor": {
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true,
            "position": "bottom-right"
        }
    });

    chart.addListener("dataUpdated", zoomChart);
    zoomChart();


    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);

        var input = 1600;
        var output = 2900;
        var profit = 8700;


        for (var i = 0; i < 100; i++) {
            // we create date objects here. In your data, you can have date strings
            // and then set format of your dates using chart.dataDateFormat property,
            // however when possible, use date objects, as this will speed up chart rendering.
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            input += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
            output += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
            profit += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);

            chartData.push({
                date: newDate,
                input: input,
                output: output,
                profit: profit
            });
        }
        return chartData;
    }

    function zoomChart(){
        chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
    }
