// from data.js
var tableData = data;

// YOUR CODE HERE!

// renderTable('')

// function renderTable(date) {
//     if (date != '') {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.filter(x => {
//             return x.datetime == date;
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     } else {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     }
// }

// let dateButton = document.getElementById('filter-btn-date')
// let dateInput = document.getElementById('datetime')

// dateButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you clicked the filter date button!')
//     console.log(dateInput.value)
//     renderTable(dateInput.value)
// })


// //CITY

// let cityButton = document.getElementById('filter-btn-city')
// let cityInput = document.getElementById('city')

// cityButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you clicked the filter city button!')
//     console.log(cityInput.value)
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     tableData.filter(x => {
//         return x.city == cityInput.value;
//     }).forEach((element) => {
//         let newTr = d3.select('tbody').append('tr');
//         Object.entries(element).forEach(([key, value]) => {
//             newTr.append('td').text(value);
//             // console.log(element.city)
//         })
//     })
// })


// //STATE

// let stateButton = document.getElementById('filter-btn-state')
// let stateInput = document.getElementById('state')

// stateButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you clicked the filter state button!')
//     console.log(stateInput.value)
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     tableData.filter(x => {
//         return x.state == stateInput.value;
//     }).forEach((element) => {
//         // document.getElementsByTagName('tbody').innerHTML = '';
//         let newTr = d3.select('tbody').append('tr');
//         Object.entries(element).forEach(([key, value]) => {
//             newTr.append('td').text(value);
//             // console.log(element.state)
//         })
//     })
// })


// //COUNTRY

// let countryButton = document.getElementById('filter-btn-country')
// let countryInput = document.getElementById('country')

// countryButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you clicked the filter country button!')
//     console.log(countryInput.value)
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     tableData.filter(x => {
//         return x.country == countryInput.value;
//     }).forEach((element) => {
//         // document.getElementsByTagName('tbody').innerHTML = '';
//         let newTr = d3.select('tbody').append('tr');
//         Object.entries(element).forEach(([key, value]) => {
//             newTr.append('td').text(value);
//             // console.log(element.country)
//         })
//     })
// })


// //SHAPE

// let shapeButton = document.getElementById('filter-btn-shape')
// let shapeInput = document.getElementById('shape')

// shapeButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log('you clicked the filter shape button!')
//     console.log(shapeInput.value)
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     tableData.filter(x => {
//         return x.shape == shapeInput.value;
//     }).forEach((element) => {
//         // document.getElementsByTagName('tbody').innerHTML = '';
//         let newTr = d3.select('tbody').append('tr');
//         Object.entries(element).forEach(([key, value]) => {
//             newTr.append('td').text(value);
//             // console.log(element.shape)
//         })
//     })
// })


//RESET BUTTON

// let resetButton = document.getElementById('filter-btn')

// resetButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     renderTable('')
// })


// SINGLE OPTION FOR ALL INPUTS

// function renderTableAll() {
//     const inputs = document.querySelectorAll('.form-control');
//     inputs.forEach(input => input.addEventListener('input', (e) => {
//         filterInput = e.target.value
//         filterType = input.id
//         console.log(filterInput)
//         console.log(filterType)
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.filter(x => {
//             return x[`${filterType}`] == `${filterInput}`
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//             })
//         })
//     }))
// }

// let filterButton = document.getElementById('filter-btn-all')
// filterButton.addEventListener('click', renderTableAll())

// function renderTableAll([input, filterType]) {
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     tableData.filter(x => {
//         return x[`${filterType}`] == `${input}`;
//     }).forEach((element) => {
//         let newTr = d3.select('tbody').append('tr');
//         Object.entries(element).forEach(([key, value]) => {
//             newTr.append('td').text(value);
//         })
//     })
// }


// let filterButton = document.getElementById('filter-btn-all')

// filterButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     document.getElementsByTagName('tbody')[0].innerHTML = '';
//     const inputs = document.querySelectorAll('.form-control');
//     inputs.forEach(input => input.addEventListener('input', (e) => {
//         filterInput = e.target.value
//         filterType = input.id
//         console.log(filterInput)
//         console.log(filterType)
//         tableData.filter(x => {
//             return x[`${filterType}`] == `${input}`;
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 // console.log(element.shape)
//             })
//         })
//     }))
// })

//SINGLE OPTION IN CLASS

// function renderTableAll() {
//     const inputs = document.querySelectorAll('.form-control');
//     inputs.forEach(input => input.addEventListener('input', (e) => {
//         filterInput = e.target.value
//         filterType = input.id
//         console.log(filterInput)
//         console.log(filterType)
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.filter(x => {
//             return x[`${filterType}`] == `${filterInput}`
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//             })
//         })
//     }))
// }

// let filterButton = document.getElementById('filter-btn-all')
// filterButton.addEventListener('click', (x) => {
//     dateInput = document.getElementById('datetime').value
//     dateFilter = document.getElementById('datetime').id
//     // console.log('you clicked on the filter ALL button!')
//     // console.log(dateInput)
//     // console.log(dateFilter)
//     if (dateInput != '') {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.filter(x => {
//             return x[`${dateFilter}`] == `${dateInput}`
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     } else {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     }
// })

// function renderTable([filter, input]) {


// }


// function renderTable(date) {
//     if (date != '') {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.filter(x => {
//             return x.datetime == date;
//         }).forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     } else {
//         document.getElementsByTagName('tbody')[0].innerHTML = '';
//         tableData.forEach((element) => {
//             let newTr = d3.select('tbody').append('tr');
//             Object.entries(element).forEach(([key, value]) => {
//                 newTr.append('td').text(value);
//                 console.log(element.datetime)
//             })
//         })
//     }
// }

function renderTable(xyz) {
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    xyz.forEach((element) => {
        let newTr = d3.select('tbody').append('tr');
        Object.entries(element).forEach(([key, value]) => {
            newTr.append('td').text(value);
        })
    })
}

renderTable(tableData)

let filterButton = document.getElementById('filter-btn-all')
filterButton.addEventListener('click', (x) => {
    dateInput = document.getElementById('datetime').value
    dateFilter = document.getElementById('datetime').id
    if (dateInput != '') {
        filteredData = tableData.filter(x => {
            return x[`${dateFilter}`] == `${dateInput}`
        })
        console.log(dateFilter)
        renderTable(filteredData)
    } else {
        filteredData = tableData
    }

    cityInput = document.getElementById('city').value
    cityFilter = document.getElementById('city').id
    if (cityInput != '') {
        filteredData = filteredData.filter(x => {
            return x[`${cityFilter}`] == `${cityInput}`
        })
        console.log(cityFilter)
        renderTable(filteredData)
    }

    stateInput = document.getElementById('state').value
    stateFilter = document.getElementById('state').id
    if (stateInput != '') {
        filteredData = filteredData.filter(x => {
            return x[`${stateFilter}`] == `${stateInput}`
        })
        console.log(stateFilter)
        renderTable(filteredData)
    }

    countryInput = document.getElementById('country').value
    countryFilter = document.getElementById('country').id
    if (countryInput != '') {
        filteredData = filteredData.filter(x => {
            return x[`${countryFilter}`] == `${countryInput}`
        })
        console.log(countryFilter)
        renderTable(filteredData)
    }

    shapeInput = document.getElementById('shape').value
    shapeFilter = document.getElementById('shape').id
    if (shapeInput != '') {
        filteredData = filteredData.filter(x => {
            return x[`${shapeFilter}`] == `${shapeInput}`
        })
        console.log(shapeFilter)
        renderTable(filteredData)
    }
})

let resetButton = document.getElementById('filter-btn-reset')
resetButton.addEventListener('click', (x) => {
    console.log('reset button')
    renderTable(tableData)
})