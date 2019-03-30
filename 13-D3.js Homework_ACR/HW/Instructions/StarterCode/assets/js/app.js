// @TODO: YOUR CODE HERE!

function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // Chart Params
    // var svgWidth = 960;
    // var svgHeight = 500;

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight - 100;

    var margin = { top: 20, right: 40, bottom: 60, left: 50 };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3
        .select("body")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv")
        .then(function (stateData) {
            console.log(stateData)

            stateData.forEach(function (data) {
                data.poverty = +data.poverty;
                data.healthcare = +data.healthcare;
                console.log(data.abbr)
            });

            // Step 2: Create scale functions
            // ==============================

            var xLinearScale = d3.scaleLinear()
                .domain([8, d3.max(stateData, d => d.poverty)])
                .range([0, width]);

            var yLinearScale = d3.scaleLinear()
                .domain([0, d3.max(stateData, d => d.healthcare)])
                .range([height, 0]);

            // Step 3: Create axis functions
            // ==============================
            var xAxis = d3.axisBottom(xLinearScale);
            var yAxis = d3.axisLeft(yLinearScale);

            // Step 4: Append Axes to the chart
            // ==============================
            chartGroup.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            chartGroup.append("g")
                .call(yAxis);

            // Step 5: Create Circles
            // ==============================
            var circlesGroup = chartGroup.selectAll("circle")
                .data(stateData)
                .enter()
                .append("circle")
                .attr('id', d => d.abbr)
                .text(d => d.abbr)
                .attr('cx', 0)
                .attr('cy', svgHeight)
                .attr('r', '5')
                .attr("fill", "gold")
                .attr("stroke-width", "1")
                .attr("stroke", "green")
            // .transition()
            // .duration(3000)
            // .attr("cx", d => xLinearScale(d.poverty))
            // .attr("cy", d => yLinearScale(d.healthcare))
            // .attr("r", "10")

            circlesGroup
                .transition()
                .duration(3000)
                .attr("cx", d => xLinearScale(d.poverty))
                .attr("cy", d => yLinearScale(d.healthcare))
                .attr("r", "10")



            var stateGroup = chartGroup.selectAll(".stateTitle")
                .data(stateData)
                .enter()
                .append("text")
                .text((d) => d.abbr)
                .attr('class', 'stateTitle')
                .attr('x', svgWidth)
                .attr('y', 0)
                .attr("font-family", "sans-serif")
                .attr("font-size", "8px")
                .attr("fill", "green")
                .attr('text-anchor', 'middle')
            // .transition()
            // .duration(3000)
            // .attr("x", d => xLinearScale(d.poverty))
            // .attr("y", d => yLinearScale(d.healthcare)+3)
            // .attr("font-family", "sans-serif")
            // .attr("font-size", "8px")
            // .attr("fill", "green")
            // .attr('text-anchor', 'middle')

            stateGroup
                .transition()
                .duration(3000)
                .attr("x", d => xLinearScale(d.poverty))
                .attr("y", d => yLinearScale(d.healthcare) + 3)
                .attr("font-family", "sans-serif")
                .attr("font-size", "8px")
                .attr("fill", "green")
                .attr('text-anchor', 'middle')




            // Step 6: Initialize tool tip
            // ==============================

            var toolTip = d3.tip()
                .attr("class", "tooltip")
                .offset([80, -60])
                .html(function (d) {
                    return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
                });

            // Step 7: Create tooltip in the chart
            // ==============================
            chartGroup.call(toolTip);


            // Step 8: Create event listeners to display and hide the tooltip
            // ==============================
            circlesGroup.on("mouseover", function (d) {
                toolTip.show(d, this);
            })

                .on("mouseout", function (d) {
                    toolTip.hide(d);
                });

            stateGroup.on("mouseover", function (d) {
                toolTip.show(d, this);
            })

                .on("mouseout", function (d) {
                    toolTip.hide(d);
                });



            // Create axes labels
            chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                .attr("class", "axisText")
                .text("Lacks Healthcare (%)");

            chartGroup.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
                .attr("class", "axisText")
                .text("In Poverty (%)");

        })
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);