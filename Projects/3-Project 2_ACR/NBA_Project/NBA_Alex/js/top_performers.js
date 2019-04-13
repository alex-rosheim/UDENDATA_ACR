d3.csv('/NBA_Alex/Resources/blk_data.csv', function(data) {
    console.log(data)
  
    let xValues = data.map(x => x.GAME_DATE);
    let yValues = data.map(x => x.BLK);
    let textValues = data.map(x => x.PLAYER_NAME);
    let sizeValues = data.map(x => x.NBA_FANTASY_PTS);
  
  
   var trace1 = {
    x: xValues,
    y: yValues,
    text: textValues,
    mode: 'markers',
    marker: {
      color: 'red',
          size: 12,
          symbol: 'circle',
          size: sizeValues
  //    color: colorValues
    }
  };
  
  var blkData = [trace1];
  
  
  var layout = {
    title: "Blocks",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: "Blocks"
    },
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble1', blkData, layout);  
  
  
  })
  
  d3.csv('/NBA_Alex/Resources/fg_data.csv', function(data) {
    console.log(data)
  
    let xValues2 = data.map(x => x.GAME_DATE);
    let yValues2 = data.map(x => x.FGM);
    let textValues2 = data.map(x => x.PLAYER_NAME);
    let sizeValues2 = data.map(x => x.NBA_FANTASY_PTS);
  
  
   var trace2 = {
    x: xValues2,
    y: yValues2,
    text: textValues2,
    mode: 'markers',
    marker: {
      color: 'blue',
          size: 12,
          symbol: 'circle',
          size: sizeValues2
  //    color: colorValues
    }
  };
  
  var fgData = [trace2];
  
  var layout2 = {
    title: "Field Goals",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: "Field Goals"
    },
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble2', fgData, layout2);  
  
  })
  
  d3.csv('/NBA_Alex/Resources/ast_data.csv', function(data) {
    console.log(data)
  
    let xValues3 = data.map(x => x.GAME_DATE);
    let yValues3 = data.map(x => x.AST);
    let textValues3 = data.map(x => x.PLAYER_NAME);
    let sizeValues3 = data.map(x => x.NBA_FANTASY_PTS);
  
  
   var trace3 = {
    x: xValues3,
    y: yValues3,
    text: textValues3,
    mode: 'markers',
    marker: {
      color: 'gray',
          size: 12,
          symbol: 'circle',
          size: sizeValues3
  //    color: colorValues
    }
  };
  
  var astData = [trace3];
  
  var layout3 = {
    title: "Assists",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: "Assists"
    },
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble3', astData, layout3);  
  
  })
  
  d3.csv('/NBA_Alex/Resources/stl_data.csv', function(data) {
    console.log(data)
  
    let xValues4 = data.map(x => x.GAME_DATE);
    let yValues4 = data.map(x => x.STL);
    let textValues4 = data.map(x => x.PLAYER_NAME);
    let sizeValues4 = data.map(x => x.NBA_FANTASY_PTS);
  
  
   var trace4 = {
    x: xValues4,
    y: yValues4,
    text: textValues4,
    mode: 'markers',
    marker: {
      color: 'orange',
          size: 12,
          symbol: 'circle',
          size: sizeValues4
  //    color: colorValues
    }
  };
  
  var stlData = [trace4];
  
  var layout4 = {
    title: "Steals",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: "Steals"
    },
    showlegend: false ,
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble4', stlData, layout4);  
  
  })
  
  d3.csv('/NBA_Alex/Resources/fnt_data.csv', function(data) {
    console.log(data)
  
    let xValues5 = data.map(x => x.GAME_DATE);
    let yValues5 = data.map(x => x.NBA_FANTASY_PTS);
    let textValues5 = data.map(x => x.PLAYER_NAME);
    let sizeValues5 = data.map(x => x.NBA_FANTASY_PTS);
    let colorValues5 = data.map(x => x.PLAYER_POSITION);
  
  
   var trace5 = {
    x: xValues5,
    y: yValues5,
    text: textValues5,
    mode: 'markers',
    marker: {
          size: 12,
          symbol: 'circle',
          size: sizeValues5,
          color: colorValues5
    },
  };
  
  var fntData = [trace5];
  
  var layout5 = {
    title: "Total Fantasy Points",
    xaxis: {
      title: ""
    },
    yaxis: {
      title: "Fantasy Points"
    },
    showlegend: false,
    height: 600,
    width: 1200
  };
  
  
  var layout = {
  
  };
  
  Plotly.newPlot('bubble5', fntData, layout5);  
  
  })