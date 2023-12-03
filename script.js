google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

var chartData = [
    ['Age','安達自願醫保（標準）計劃 (安達人壽保險香港有限公司)','「只衛您」標準自願醫保計劃'],
    [0,3132,4200],
    [1,2677,3570],
    [2,2677,3070],
    [3,2677,2702],
    [4,2677,2378],
    [5,2677,2202],
    [6,2069,2095],
    [7,2069,1992],
    [8,2069,1895],
    [9,2069,1802],
    [10,2069,1773],
    [11,2069,1803],
    [12,2069,1833],
    [13,2069,1865],
    [14,2069,1897],
    [15,2069,1944],
    [16,1986,2008],
    [17,2034,2073],
    [18,2075,2141],
    [19,2100,2211],
    [20,2133,2258],
    [21,2157,2279],
    [22,2191,2300],
    [23,2215,2322],
    [24,2256,2344],
    [25,2297,2378],
    [26,2354,2422],
    [27,2387,2467],
    [28,2420,2514],
    [29,2486,2561],
    [30,2534,2623],
    [31,2592,2699],
    [32,2641,2778],
    [33,2698,2859],
    [34,2781,2943],
    [35,2818,3043],
    [36,2855,3162],
    [37,2893,3284],
    [38,2931,3411],
    [39,2968,3543],
    [40,3005,3703],
    [41,3136,3895],
    [42,3273,4096],
    [43,3432,4308],
    [44,3597,4530],
    [45,3771,4738],
    [46,3959,4930],
    [47,4139,5128],
    [48,4348,5336],
    [49,4551,5551],
    [50,4781,5837],
    [51,5012,6201],
    [52,5265,6587],
    [53,5525,6999],
    [54,5756,7435],
    [55,6015,7877],
    [56,6268,8323],
    [57,6535,8794],
    [58,6824,9292],
    [59,7048,9818],
    [60,7285,10282],
    [61,7612,10680],
    [62,7853,11092],
    [63,8123,11520],
    [64,8438,11965],
    [65,8751,12573],
    [66,9079,13360],
    [67,9414,14196],
    [68,9771,15085],
    [69,10216,16029],
    [70,10690,16748],
    [71,11165,17220],
    [72,11682,17705],
    [73,12214,18205],
    [74,12667,18718],
    [75,13141,19280],
    [76,13644,19858],
    [77,14140,20455],
    [78,14665,21068],
    [79,15161,21700],
    [80,15642,22351],
    [81,16138,22798],
    [82,16627,23254],
    [83,17108,23719],
    [84,17575,24194],
    [85,18056,24677],
    [86,18545,24924],
    [87,19049,25173],
    [88,19573,25425],
    [89,20025,25679],
    [90,20514,25936],
    [91,20988,26065],
    [92,21506,26196],
    [93,22016,26327],
    [94,22483,26458],
    [95,22965,26590],
    [96,23453,26723],
    [97,23956,26857],
    [98,24467,26991],
    [99,24970,27126]
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
    var selectedPlanIndices = [];
    for (var i = 0; i < selectBox.options.length; i++) {
        if (selectBox.options[i].selected) {
            selectedPlanIndices.push(i); // Push the index of the selected plan
        }
    }
    return selectedPlanIndices;
}



function filterData(data, selectedPlanIndices) {
    var headers = data[0];
    var filteredHeaders = ['Age'];
    var columnIndex = [];

    selectedPlanIndices.forEach(function(planIndex) {
        filteredHeaders.push(headers[planIndex + 1]); // +1 because the first column is 'Age'
        columnIndex.push(planIndex + 1);
    });

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


