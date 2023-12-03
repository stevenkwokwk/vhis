google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

// Declare the data as a separate variable
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
    var data = google.visualization.arrayToDataTable(chartData);

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
