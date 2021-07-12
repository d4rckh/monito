var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var data2 = {}
var dataReceived = {}


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'data',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: false
    }
});


var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'data',
            data: [],
            backgroundColor: [
            ],
            borderColor: [
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        responsive: false
    }
});



socket.on("trigger", (logs) => {
    
})

function add1ToDataRecevied() {
    const date = new Date()
    const index = date.getSeconds().toString() + date.getMinutes().toString() + date.getHours().toString() + date.getDay().toString()
    if (dataReceived[index]) {
        dataReceived[index].count = dataReceived[index].count + 1
    } else {
        dataReceived[index] = {
            date,
            count: 1
        } 
    }
}

function calculateData() {
    data2 = {}
    logs.forEach(element => {    
        console.log(element)
        if (data2[element.trigger]) {
            data2[element.trigger] = data2[ element.trigger] + 1
        } else {
            data2[element.trigger] = 1
        }
    });
}
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function updateGraph() {
    myChart.data.labels = Object.keys(data2).map(key => damntriggers[key] ? damntriggers[key].name : "Unknown")
    myChart.data.datasets[0].data = Object.values(data2)
    myChart.update()

    const sorted = sortByKey(Object.values(dataReceived), "date")
    console.log(sorted)
    
    myChart2.data.labels = sorted.map(key => 
            key.date.toLocaleString() 
        )
    myChart2.data.datasets[0].data = sorted.map(key => key.count.toString())
    myChart2.update()
}