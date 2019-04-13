document.getElementById('myButton').addEventListener('click', (x) => {
    dateField = document.getElementById('datefilter').value
    console.log('BUTTON CLICKED')
    console.log(dateField)
    d3.selectAll('svg').remove()
    renderTable(dateField)
})

document.getElementById('datefilter').addEventListener('input', (x) => {

    dateField = document.getElementById('datefilter').value
    console.log('input within date filter', dateField)
})


function renderTable(date) {

    // Define SVG area dimensions
    var svgWidth = 900;
    var svgHeight = 600;

    // Define the chart's margins as an object
    var chartMargin = {
        top: 30,
        right: 30,
        bottom: 50,
        left: 50
    };

    // var width = svgWidth - margin.left - margin.right;
    // var height = svgHeight - margin.top - margin.bottom;

    // Define dimensions of the chart area
    var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

    // Select body, append SVG area to it, and set the dimensions
    var svg = d3
        .select("body")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    // Append a group to the SVG area and shift ('translate') it to the right and down to adhere
    // to the margins set in the "chartMargin" object.
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

    // Load data from hours-of-tv-watched.csv
    d3.csv("/NBA_Alex/Resources/nba_players.csv", function (error, nbaData) {

        // Log an error if one exists
        if (error) return console.warn(error);

        // Print the nbaData
        console.log(nbaData);

        nbaData = nbaData.filter(function (x) { return x.GAME_DATE == date })
        // .sort(function(a,b){return +a.NBA_FANTASY_PTS + +b.NBA_FANTASY_PTS}).slice(0,25)
        // data.filter(function(d){ return d.name != "toto" })
        // data.sort(function(a,b) { return +a.value - +b.value })

        console.log(nbaData);
        // console.log(unique(nbaData.map(function(d){return d.GAME_DATE})))
        // console.log(d3.map(nbaData, function (d) { return d.TEAM_ABBREVIATION; }).keys())

        var parseTime = d3.timeParse("%d-%b-%Y");

        nbaData.forEach(function (data) {
            data.GAME_DATE = parseTime(data.GAME_DATE);
            data.NBA_FANTASY_PTS = +data.NBA_FANTASY_PTS;
            data.NBA_FANTASY_PTS_RANK = +data.NBA_FANTASY_PTS_RANK;
            data.MIN = +data.MIN;
            data.AST = +data.AST;
            // console.log(data.NBA_FANTASY_PTS)

        })

        var xLinearScale = d3.scaleLinear()
            // .domain([8, d3.max(nbaData, d => d.GAME_DATE)])
            .domain([0, d3.max(nbaData, d => d.MIN)])
            .range([0, chartWidth]);

        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(nbaData, d => d.AST)])
            // .domain([0, 12])
            .range([chartHeight, 0]);

        // Step 3: Create axis functions
        // ==============================
        // var xAxis = d3.axisBottom(xTimeScale);
        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);


        // What to do when one group is hovered
        var highlight = function (d) {
            // reduce opacity of all groups
            d3.selectAll(".bubbles").style("opacity", .05)
            // expect the one that is hovered
            d3.selectAll("." + d).style("opacity", 1)
        }

        // And when it is not hovered anymore
        var noHighlight = function (d) {
            d3.selectAll(".bubbles").style("opacity", 1)
        }

        positionColor = {
            'G': 'green',
            'F': 'gold',
            'C': 'orange',
            'N': 'red'
        }

        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
            .data(nbaData)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "bubbles " + d.TEAM_ABBREVIATION })
            // .attr('id', d => d.PLAYER_POSITION)
            // .text(d => d.abbr)
            .attr('cx', 0)
            .attr('cy', svgHeight)
            .attr('r', '0')
            // .attr("fill", "gold")
            .style("fill", d => positionColor[d.PLAYER_POSITION])
            // .attr("fill", d => positionColor(d.PLAYER_POSITION))
            .attr("stroke-width", "1")
            .attr("stroke", "black")


        circlesGroup
            .transition()
            .duration(3000)
            .attr("cx", d => xLinearScale(d.MIN))
            .attr("cy", d => yLinearScale(d.AST))
            .attr("r", "12")
        // .attr("r", d => d.NBA_FANTASY_PTS / 2.5)


        var teamGroup = chartGroup.selectAll(".teamTitle")
            .data(nbaData)
            .enter()
            .append("text")
            .text((d) => d.TEAM_ABBREVIATION)
            .attr('class', 'teamTitle')
            .attr('x', svgWidth)
            .attr('y', 0)
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "black")
            .attr('text-anchor', 'middle')

        teamGroup
            .transition()
            .duration(3000)
            .attr("x", d => xLinearScale(d.MIN))
            .attr("y", d => yLinearScale(d.AST) + 3)
            .attr("font-family", "sans-serif")
            .attr("font-size", "8px")
            .attr("fill", "black")
            .attr('text-anchor', 'middle')


        // Step 6: Initialize tool tip
        // ==============================

        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function (d) {
                return (`ASSISTS: ${d.AST}<br> ${d.MATCHUP}<br>${d.PLAYER_NAME}<br> ${date}`);
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

        teamGroup.on("mouseover", function (d) {
            toolTip.show(d, this);
        })

            .on("mouseout", function (d) {
                toolTip.hide(d);
            });

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - chartMargin.left)
            .attr("x", 0 - (chartHeight / 1.5))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("ASSISTS ON " + date)
            .attr("font-family", "sans-serif")
            .attr("font-size", "16px")


        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth / 2.5}, ${chartHeight + chartMargin.top + 5})`)
            .attr("class", "axisText")
            .text("MINUTES PLAYED ON " + date)
            .attr("font-family", "sans-serif")
            .attr("font-size", "16px");



        // var myColor = d3.scaleOrdinal()
        //     .domain(["Point_Guard", "Shooting_Guard", "Small_Forward", "Power_Forward", "Center"])
        //     .range(d3.schemeSet1);

        // Add one dot in the legend for each name.
        var size = 20
        var allPositions = ["Guard", "Forward", "Center"]
        var positionColors = ['green', 'gold', 'orange']
        svg.selectAll("myRect")
            .data(allPositions)
            .enter()
            .append("circle")
            .attr("cx", 800)
            .attr("cy", function (d, i) { return 478 + i * (size + 5) })
            .attr("r", 10)
            .style("fill", function (d, i) { return positionColors[i] })
            .attr("stroke-width", "1")
            .attr("stroke", "black")
        // .on("mouseover", highlight)
        // .on("mouseleave", noHighlight)

        // Add labels beside legend dots
        svg.selectAll("myLabels")
            .data(allPositions)
            .enter()
            .append("text")
            .attr("x", 800 + size * .8)
            .attr("y", function (d, i) { return 470 + i * (size + 5) + (size / 2) })
            .style("fill", function (d, i) { return positionColors[i] })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("stroke-width", ".5")
            .attr("stroke", "black")
        // .on("mouseover", highlight)
        // .on("mouseleave", noHighlight)

        var allTeams = d3.map(nbaData, function (d) { return d.TEAM_ABBREVIATION; }).keys()
        svg.selectAll("myTeams")
            .data(allTeams)
            .enter()
            .append("text")
            // .attr("x", 800)
            // .attr("y", 500)
            .attr("x", 60 + size * .8)
            .attr("y", function (d, i) { return 50 + i * (size + 5) + (size / 2) })
            .text(function (d) { return d })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .on("mouseover", highlight)
            .on("mouseleave", noHighlight)

    })

}

renderTable("2019-01-10")
