document.addEventListener("DOMContentLoaded", function(){
    d3.select("body").style("background-color", "#e0f0f5");
    d3.csv("/covid-19-students-delhi-1.csv").then((data) => {
        console.log(data);
    });
    var chart = c3.generate({
        bindto: '#chart',
        data: {
          columns: [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
          ]
        }
    });
    let graph = document.querySelector("div#chart");
    graph.append(chart.element);
});