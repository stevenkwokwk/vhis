var selectAllElement=document.querySelector("#selectAll");

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


var chartData=chartDataMale;

var planColors = {
    "Bowtie 保泰": "#ff0068",
    // Add more plans and their colors here
    // "PlanName": "ColorCode"
};

var filteredDataGlobal;

function drawChart() {
    var selectedPlans = getSelectedPlans();
    var filteredData = filterData(chartData, selectedPlans);
    filteredDataGlobal=filteredData;
    //find the max value of the age 99
    var maxValue = Math.max(...filteredData[100]);
    var vAxisMaxValue=Math.ceil(maxValue/5000)*5000;

    var data = google.visualization.arrayToDataTable(filteredData);

   var options = {
        hAxis: {title: '年齡'},
        vAxis: {
            title: '每年保費',
            format: 'HK$#,###', // This will format the numbers with a K for thousand, M for million, etc.
            viewWindow: {
                min: 0,
                max: vAxisMaxValue // or a suitable maximum value based on your data
            },
            gridlines: { count: 6 }
        },
        series: getSeriesOptions(selectedPlans),
        curveType: 'none',
        legend: { position: 'bottom' },
        width: '100%',
        height: getChartHeight(),
        chartArea: { width: '80%' } 
    };

    var chart = new google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(data, options);
}

function getSelectedPlans() {
    var checkboxes = document.querySelectorAll('.planOption');
    var selectedPlanIndices = [];

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            var label = document.querySelector('label[for="' + checkbox.id + '"]');
            if (label) {
                var planName = label.textContent.trim();
                var columnIndex = findColumnIndexByPlanName(planName);
                if (columnIndex !== -1) {
                    selectedPlanIndices.push(columnIndex);
                }
            }
        }
    });

    return selectedPlanIndices;
}

function findColumnIndexByPlanName(planName) {
    var headers = chartData[0];
    return headers.indexOf(planName)-1;
}


function getSeriesOptions(selectedPlanIndices) {
    var seriesOptions = {};
    var headers = chartData[0];

    selectedPlanIndices.forEach(function(index, i) {
        var planName = headers[index + 1]; // +1 to skip the 'Age' column
        var color = planColors[planName];
        if (color) {
            seriesOptions[i] = { color: color };
        }
    });

    return seriesOptions;
}


function selectAllCheckboxes(source,selectBool) {
    var checkboxes = document.querySelectorAll('.planOption');
    checkboxes.forEach(function(checkbox) {
        if (selectBool) {
            checkbox.checked = source.checked;
        } else {
            checkbox.checked = false;
            source.checked=false;
            document.querySelector("#selectAll").checked=false;
        }
    });
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

function getChartHeight() {
    var chartWidth = document.getElementById('line_chart').offsetWidth;
    return chartWidth * 0.5625; // 16:9 aspect ratio
}

window.addEventListener('resize', function() {
    drawChart();
});

function preventDropdownClose(event) {
    event.stopPropagation();
}

drawChart();
