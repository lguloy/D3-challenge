// @TODO: YOUR CODE HERE!

//Create SVG and G tags to place the chart in

//svg container dimensions
var svgHeight = 500;
var svgWidth = 900;

var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 50
};

//create chart area
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;


//create the scg container with the desired attributes for height and width
var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

// Shift by margins by creating a chart group   
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
// Load data from the csv file
d3.csv("./assets/data/data.csv").then(function(journalism) {
    
    console.log(journalism)

    //Read our csv data in order to use them to create our scales and axes
    //We use object iteration in order to do this by going through
    //each element in the array and recording the important info
    
    //Initialize arrays
    var abbr = []
    var smokers = []
    var age = []

    //Object iteration to store values into arrays
    journalism.forEach((items) => {
        Object.entries(items).forEach(([key,value]) => {
            //console.log(`Key: ${key} and Value ${value}`)
            if (key === "abbr") {
               abbr.push(value)
            } 

            else if (key === "smokes"){
                smokers.push(+value)
            }

            else if (key === "age"){
                age.push(+value)
            }
        })
    })

    //create scales
    var yScale = d3.scaleLinear()
        .domain([6, d3.max(smokers)])
        .range([chartHeight, 0]);
    var xScale = d3.scaleLinear()
        .domain([25, d3.max(age)])
        .range([0,chartWidth]);

    //create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);
    
    chartGroup.append("g")
        .call(yAxis);
    
    //create data markers
    var circles = chartGroup.selectAll("circle")
        .data(journalism)
        .enter()
        .append("circle")
        .attr("r", "15")
        .style("fill", "#0ABAAF")
        .style("opacity", ".5")
        .style("stroke", "black")
    
    //create data labels
    var states = chartGroup.append("g").selectAll("text")
        .data(journalism)
        .enter()
        .append("text")
        .style("stroke", "#0055FF")
        .style("fill", "#0055FF")
        .text(d => d.abbr)
        .attr("x", (d, i) => xScale(+d.age)-10)
        .attr("y", d => yScale(+d.smokes)+5)
        
    //Axis titles
    chartGroup.append("g").append("text")
        .text("Age (Median)")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight+margin.top-20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "black")


    chartGroup.append("g").append("text")
        .text("% Smokes")
        .attr("transform", `rotate(${90})`)
        .attr("x", chartHeight/2)
        .attr("y", margin.left)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .attr("fill", "black")

    //transition on page load
    chartGroup.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx", (d, i) => xScale(+d.age))
        .attr("cy", d => yScale(+d.smokes))
    
        




});