// Load the Visualization API and the linechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(function() {
  Papa.parse("vhis_latest.csv", {
    download: true,
    header: true,
    complete: function(results) {
      drawChart(results.data);
    }
  });
});

function drawChart(data) {
  // Process and structure the data here based on the CSV content
  // Example: Convert CSV data to the format required by Google Charts
  var chartData = new google.visualization.DataTable();
  chartData.addColumn('number', 'Age');
  // Dynamically add columns based on the plans and populate the dropdown
  var plans = new Set();
  data.forEach(row => {
    plans.add(row.Plan);
  });
  plans.forEach(plan => {
    chartData.addColumn('number', plan);
    // Add options to the scheme selector
    var option = document.createElement("option");
    option.text = plan;
    option.value = plan;
    document.getElementById('schemeSelector').add(option);
  });

  // Filter data based on the initial selection
  var filteredData = filterData(data, 'Male', plans);
  chartData.addRows(filteredData);

  var options = {
    title: 'Insurance Premium by Age and Plan',
    hAxis: {title: 'Age'},
    vAxis: {title: 'Premium'}
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(chartData, options);

  document.getElementById('schemeSelector').addEventListener('change', function() {
    updateChart(data, chartData, chart, options);
  });

  document.getElementById('genderSelector').addEventListener('change', function() {
    updateChart(data, chartData, chart, options);
  });
}

/**
 * Filters the data based on selected scheme and gender.
 * 
 * @param {Array} data - The complete dataset.
 * @param {string} selectedScheme - The selected scheme from the dropdown.
 * @param {string} selectedGender - The selected gender from the dropdown.
 * @returns {Array} - Filtered data based on the selected scheme and gender.
 */
function filterData(data, selectedScheme, selectedGender) {
    // Filter the data based on the scheme and gender
    return data.filter(row => {
        const matchesScheme = selectedScheme === "All" || row['Plan'] === selectedScheme;
        const matchesGender = selectedGender === "All" || row['Gender'] === selectedGender;
        return matchesScheme && matchesGender;
    });
}

function updateChart(originalData, chartData, chart, options) {
  // Get selected gender and plans
  var selectedGender = document.getElementById('genderSelector').value;
  var selectedPlans = Array.from(document.getElementById('schemeSelector').selectedOptions).map(o => o.value);
  
  // Filter data
  var filteredData = filterData(originalData, selectedGender, selectedPlans);
  chartData.removeRows(0, chartData.getNumberOfRows());
  chartData.addRows(filteredData);

  // Redraw the chart
  chart.draw(chartData, options);
}
