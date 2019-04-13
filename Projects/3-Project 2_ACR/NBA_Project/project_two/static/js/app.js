// // 


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
    d3.json("/metadata/date").then((dates) => {


        var date_info = dates['GAME_DATE']

        Object.values(date_info).map(x => {

          selector
            .append("option")
            .text(x)
            .property("value", x);

        })
    
    })
}


function buildMetadata(newSample) {
    console.log()

      let url = `metadata/${newSample}`;

      document.getElementsByTagName('tbody')[0].innerHTML = '';
      d3.json(url).then(function(data) {
        console.log(data)
  

        Object.values(data).map(x =>{

    
          let tbody = d3.select('tbody')
          let newTr = tbody.append('tr')


          Object.values(x).forEach(val => {

            if (val) {
                
              console.log(val)
              newTr.append('td').text(val[1])

            }

            
        })
          
        })


      })
    }

// buildMetadata(2019-04-01)
  // function buildTable(newSample) {

  //   let url = `metadata/table/${newSample}`;

  //   d3.json(url).then(function(data) {

  //     console.log(data)
  //   })
  // }




  
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  // buildCharts(newSample);
  buildMetadata(newSample);
  // buildTable(newSample);
}

// // Initialize the dashboard
init();


  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
// }

// function buildCharts(sample) {

//     console.log(sample)

//     let url = `samples/${sample}`;
//     d3.json(url).then(function(data){

//       let myValues = data.sample_values.slice(0,10);
//       let myLabels = data.otu_ids;
  
//       var data = [{
//         values: myValues,
//         labels: myLabels,
//         type: 'pie'
//       }];
      
//       var layout = {
//         height: 400,
//         width: 500
//       };
      
//     Plotly.newPlot('pie', data, layout);
    
//   })

//   d3.json(url).then(function(data){

//   let xValues = data.otu_ids;
//   let yValues = data.sample_values;
//   let sizeValues = data.sample_values;
//   let colorValues = data.otu_ids;
//   let textValues = data.otu_labels;

//   var trace1 =
//       {
//           x: xValues,
//           y: yValues,
//           text : textValues,
//           mode: 'markers',
//           marker: {
//               color: colorValues,
//               size: sizeValues,
//           }
//       }
    
//   var data = [trace1];

//   var layout = {
//     showlegend : false,
//     height : 600,
//     width : 1100
//   };
  
//   Plotly.newPlot('bubble', data, layout)

// })

// }


//   d3.json("/name").then((sampleNames) => {
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     const firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }




/* Please ❤ this if you like it! */


(function($) { "use strict";
	
	//Page cursors

    document.getElementsByTagName("body")[0].addEventListener("mousemove", function(n) {
        t.style.left = n.clientX + "px", 
		t.style.top = n.clientY + "px", 
		e.style.left = n.clientX + "px", 
		e.style.top = n.clientY + "px", 
		i.style.left = n.clientX + "px", 
		i.style.top = n.clientY + "px"
    });
    var t = document.getElementById("cursor"),
        e = document.getElementById("cursor2"),
        i = document.getElementById("cursor3");
    function n(t) {
        e.classList.add("hover"), i.classList.add("hover")
    }
    function s(t) {
        e.classList.remove("hover"), i.classList.remove("hover")
    }
    s();
    for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
        o(r[a])
    }
    function o(t) {
        t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
    }


	//Switch light/dark
	
	$(".switch").on('click', function () {
		if ($("body").hasClass("light")) {
			$("body").removeClass("light");
			$(".switch").removeClass("switched");
		}
		else {
			$("body").addClass("light");
			$(".switch").addClass("switched");
		}
	});
	
	$(document).ready(function() {	
		
		/* Hero Case study images */			
		
		$('.slide-buttons li:nth-child(1)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(1)').addClass("show");
			$('.slide-buttons li:nth-child(1)').addClass('active');
		})
		$('.slide-buttons li:nth-child(2)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(2)').addClass("show");
			$('.slide-buttons li:nth-child(2)').addClass('active');
		})
		$('.slide-buttons li:nth-child(3)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(3)').addClass("show");
			$('.slide-buttons li:nth-child(3)').addClass('active');
		})
		$('.slide-buttons li:nth-child(4)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(4)').addClass("show");
			$('.slide-buttons li:nth-child(4)').addClass('active');
		})
		$('.slide-buttons li:nth-child(5)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(5)').addClass("show");
			$('.slide-buttons li:nth-child(5)').addClass('active');
		})
		$('.slide-buttons li:nth-child(6)').on('mouseenter', function() {
			$('.slide-buttons li.active').removeClass('active');
			$('.hero-center-section.show').removeClass("show");
			$('.hero-center-section:nth-child(6)').addClass("show");
			$('.slide-buttons li:nth-child(6)').addClass('active');
		})
		$('.slide-buttons li:nth-child(1)').trigger('mouseenter')   
		
	});
	
})(jQuery); 

