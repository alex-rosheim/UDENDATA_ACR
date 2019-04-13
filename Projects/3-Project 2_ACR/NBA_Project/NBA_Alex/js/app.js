function getDates() {

  var selector = d3.select("#selDataset")

  d3.csv("/NBA_Alex/Resources/nba_players.csv", function (nbaData) {
    // console.log(nbaData)
    // selector.event.preventDefault()

    nbaData.forEach(x => {
      console.log(x.GAME_DATE)
    });

    gameDates = d3.map(nbaData, function (d) { return d.GAME_DATE; }).keys()

    // var date_info = dates['GAME_DATE']

    Object.values(gameDates).map(x => {

      // selector.on('change', function (d) {
      //   value = (d3.selector(this).property('value'))
      //   alert(value)
      // })

      selector.append("option")
        .text(x)
        .property("value", x);

        // selector.event.preventDefault()


    })
    // alert('gamedates.map')
  })
}

getDates()



document.getElementById('myButton').addEventListener('click', (x) =>{
  dateField = document.getElementById('datefilter').value
  console.log('BUTTON CLICKED')
  console.log(dateField)
})

document.getElementById('datefilter').addEventListener('input', (x) =>{
  
  dateField = document.getElementById('datefilter').value
  console.log('input within date filter', dateField)
})



// $.ajax({
//   url : "/NBA_Alex/Resources/nba_players.csv",
//   dataType: 'text'
// }).done(getDates)

// function getDates(data) {
//   // console.log(data)

//   var allRows = data.split(/\r?\n|\r/);//makes each row a string

//   console.log(allRows)

//   allRows.forEach(x => {
//     console.log(x.split(','))
    
//   });
// }