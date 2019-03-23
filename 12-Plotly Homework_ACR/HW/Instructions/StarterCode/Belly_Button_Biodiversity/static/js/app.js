function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`

  // Use `.html("") to clear any existing metadata

  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.

  let url = `metadata/${sample}`
  d3.json(url).then(function (data) {
    d3.select('#sample-metadata').html('')
    let htmlBlock = d3.select('#sample-metadata')
    Object.keys(data).forEach(key => {
      htmlBlock.append('p').text(key + ' : ' + data[key])
    })
  })
}

// @TODO: Build a Pie Chart
// HINT: You will need to use slice() to grab the top 10 sample_values,
// otu_ids, and labels (10 each).
// Plot the chart to a div tag with id "plot"

function buildCharts(sample) {
  console.log(sample)
  let url = `/samples/${sample}`
  d3.json(url).then(function (data) {
    // console.log(data)
    pieValues = data.sample_values
    pieLabels = data.otu_ids

    // pieInfo = {}
    // for (var i = 0; i < 80; i++) {
    //   pieInfo[pieLabels[i]] = pieValues[i]
    // }
    // console.log(pieInfo)

    // console.log(Object.keys(pieInfo))
    // console.log(Object.values(pieInfo).sort(function(a,b){return pieInfo[a]-pieInfo[b]}))
    // console.log(Object.entries(pieInfo).sort(function (a,b) {return pieInfo[b]-pieInfo[a]}))

    // pieInfoSorted = Object.keys(pieInfo).sort(function(a,b){
    //   return pieInfo[a]-pieInfo[b]
    // })
    // console.log(pieInfoSorted);

    var pieData = [{
      values: pieValues.slice(0, 10),
      labels: pieLabels.slice(0, 10),
      type: 'pie',
    }]

    var layout = {
      title: `OTU_ID ${sample}`,
      height: 500,
      width: 400,
    }

    Plotly.newPlot("pie", pieData, layout);

  })

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Build a Bubble Chart using the sample data

  // Use the OTU IDs for the x values
  // Use the Sample Values for the y values
  // Use the Sample Values for the marker size
  // Use the OTU IDs for the marker colors
  // Use the OTU Description Data for the text values

  d3.json(url).then(function (data) {
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      mode: "markers",
      marker: {
        'color': data.otu_ids,
        'colorscale': 'Viridis',
        'size': data.sample_values,
        'text': data.otu_labels,
      }
    };

    var layout = {
      title: `OTU_ID ${sample}`,
      xaxis: { title: "OTU_ID" },
      yaxis: { title: "Sample Value" }
    };
    Plotly.newPlot("bubble", [trace1], layout);
  })
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
