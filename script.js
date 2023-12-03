google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var chartData = [
    ['Age', 'AIA 自願醫保標準計劃', '安聯醫療保障'],
    [0, 2758.4, 4584],
    [1, 2758.4, 3948],
    [2, 2758.4, 3396],
    [3, 2758.4, 2928],
    [4, 2758.4, 2532],
    [5, 1568, 2208],
    [6, 1568, 2124],
    [7, 1568, 1884],
    [8, 1568, 1704],
    [9, 1568, 1572],
    [10, 1568, 1464]
];


function drawChart() {
    var selectedPlans = getSelectedPlans();
    var filteredData = filterData(chartData, selectedPlans);

    var data = google.visualization.arrayToDataTable(filteredData);

   var options = {
        title: 'Insurance Premiums by Age',
        hAxis: {title: 'Age'},
        vAxis: {title: 'Premium'},
        series: {
            0: { color: '#e2431e' },
            1: { color: '#6f9654' }
        },
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(data, options);
}

function getSelectedPlans() {
    var selectBox = document.getElementById('planSelect');
    var selectedPlans = [];
    for (var i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].selected) {
            selectedPlans.push(selectBox.options[i].value);
        }
    }
    return selectedPlans;
}


function filterData(data, selectedPlans) {
    var headers = data[0];
    var filteredHeaders = ['Age'];
    var columnIndex = [];

    if (selectedPlans.includes("AIA")) {
        filteredHeaders.push(headers[1]);
        columnIndex.push(1);
    }
    if (selectedPlans.includes("AnLian")) {
        filteredHeaders.push(headers[2]);
        columnIndex.push(2);
    }

    var filteredData = [filteredHeaders];

    for (var i = 1; i < data.length; i++) {
        var row = [data[i][0]]; // Add age
        columnIndex.forEach(function(index) {
            row.push(data[i][index]);
        });
        filteredData.push(row);
    }
    return filteredData;
}

