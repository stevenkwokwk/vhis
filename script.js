google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


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

    for (var i = 2; i < selectBox.options.length; i++) { // Start from index 2 to skip 'Select All' and 'Deselect All'
        if (selectBox.options[i].selected) {
            selectedPlanIndices.push(i - 2); // Adjust index because of the two new options
        }
    }

    // Check for Select All or Deselect All
    if (selectBox.options[0].selected) { // Select All
        selectedPlanIndices = [];
        for (var i = 2; i < selectBox.options.length; i++) {
            selectedPlanIndices.push(i - 2);
            selectBox.options[i].selected = true;
        }
    } else if (selectBox.options[1].selected) { // Deselect All
        selectedPlanIndices = [];
        for (var i = 2; i < selectBox.options.length; i++) {
            selectBox.options[i].selected = false;
        }
    }

    return selectedPlanIndices;
}

// Call this function whenever the chart needs to be redrawn
function updateSelection() {
    var selectBox = document.getElementById('planSelect');
    if (selectBox.options[0].selected) { // If Select All is selected
        for (var i = 2; i < selectBox.options.length; i++) {
            selectBox.options[i].selected = true;
        }
    } else if (selectBox.options[1].selected) { // If Deselect All is selected
        for (var i = 2; i < selectBox.options.length; i++) {
            selectBox.options[i].selected = false;
        }
    }
    drawChart();
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


