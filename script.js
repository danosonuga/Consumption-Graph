// Set the dimensions of the canvas / graph
var margin = { top: 30, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%m/%d/%Y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Consumption); });

// Adds the svg canvas
var svg = d3.select("#graph")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("energy_consumption_user1.csv").then(function(data) {

    // Format the data
    data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Consumption = +d.Consumption;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain([0, d3.max(data, function(d) { return d.Consumption; })]);

    // Add the valueline path
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});