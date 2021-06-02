// Basic parameters of the svg
var margin = {
  top: 15,
  bottom: 15,
  left: 70,
  right: 15
};

var width = 900;
var height = 600;

var svgHeight = height + margin.top + margin.bottom;
var svgWidth = width + margin.left + margin.right;

var svg = d3.select('#svg-area')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

var tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .attr('opacity', '0');


// Read and arrange the data
// var data = d3.json("/data/data.json", function(error, data) {

//         var stats =  d3.select("body")
//               .selectAll("p")
//               .data(data)
//               .enter()
//               .append("p")
//               .text(function (d, i) {
//                 console.log("year: " + d.year);; // year
//                 console.log("points: " + d.points); // points
//                 console.log("wins: " + d.wins); // wins
//                 console.log("draws: " + d.draws); // draws
//                 console.log("losses: " + d.losses); // losses

//                 return "Year: " + d.year + ", " + "Points: " + d.points + ", " + "Wins: " + d.wins+ ", " + "Lossses: " + d.losses;
//               });

//       });

// // Set scales
// var xScale = d3.scaleBand().rangeRound([0, 100]).padding(0.1);
// var yScale = d3.scaleLinear().domain([2010, 2020]).range([200, 0]);

// var scale = d3.scaleLinear()
//             .domain([d3.min(data), d3.max(data)])
//             .range([0, 100]);
// var g = svg.selectAll("g")
//               .data(data)
//               .enter()
//               .append("g")
//               .attr("transform", function (d, i) {
//                   return "translate(0," + i * barHeight + ")";
//               });

// // Create axes
//  var width = 500, height = 500;
//  var data = [(2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020)];

// // Append SVG 
// var svg = d3.select("body")
//         .append("svg")
//         .attr("width", width)
//         .attr("height", height);


// // Create scale
//   var xscale = d3.scaleLinear()
//         .domain([0, d3.max(data)])
//         .range([0, width - 100]);

//   var yscale = d3.scaleLinear()
//           .domain([0, d3.max(data)])
//           .range([height/2, 0]);


// // Add scales to axis

//   var x_axis = d3.axisBottom()
//       .scale(xscale);

//   var y_axis = d3.axisLeft()
//           .scale(yscale);

//   //Append group and insert axis
// svg.append("g")
//    .attr("transform", "translate(50, 10)")
//    .call(y_axis);

//     var xAxisTranslate = height/2 + 10;
//       svg.append("g")
//             .attr("transform", "translate(50, " + xAxisTranslate  +")")
//             .call(x_axis)


// Append the axes as G
        // g.append("g")
        //  .call(d3.axisLeft(yScale).tickFormat(function(d){
        //      return "$" + d;
        //  }).ticks(10))
        //  .append("text")
        //  .attr("y", 6)
        //  .attr("dy", "0.71em")
        //  .attr("text-anchor", "end")
        //  .text("value");

//Create Bars or Line function
 // g.selectAll(".bar")
 //         .data(data)
 //         .enter().append("rect")
 //         .attr("class", "bar")
 //         .attr("x", function(d) { return xScale(d.year); })
 //         .attr("y", function(d) { return yScale(d.points); })
 //         .attr("width", xScale.bandwidth())
 //         .attr("height", function(d) { return height - yScale(d.value); 
 //         });

//animated bar chart
    var svg = d3.select("svg"),
        margin = 300,
        width = svg.attr("width") - margin,
        height = svg.attr("height") - margin;

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Year")


    var x = d3.scaleBand().range([0, width]).padding(0.4),
        y = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");
            // .ticks('2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020');

   
   // g.append("g")
   //  .attr("class", "y axis")
   //  .attr("transform", "translate(30,0)")//magic number, change it at will
   //  .call(d3.axisLeft(yScale));

   var data = d3.json("/data/data.json", function(error, data) {

        var stats =  d3.select("body")
              .selectAll("p")
              .data(data)
              .enter()
              .append("p")
              .text(function (d, i) {
                console.log("year: " + d.year);; // year
                console.log("points: " + d.points); // points
                console.log("wins: " + d.wins); // wins
                console.log("draws: " + d.draws); // draws
                console.log("losses: " + d.losses); // losses

                return "Year: " + d.year + ", " + "Points: " + d.points + ", " + "Wins: " + d.wins+ ", " + "Lossses: " + d.losses;
              });



        x.domain(data.map(function(d) { return d.year; }));
        y.domain([0, d3.max(data, function(d) { return d.points; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Year");

        g.append("g")
         .call(d3.axisLeft(y).tickFormat(function(d){
             return "$" + d.points;
         }).ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Points");

        g.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .on("mouseover", onMouseOver) //Add listener for the mouseover event
         .on("mouseout", onMouseOut)   //Add listener for the mouseout event
         .attr("x", function(d) { return x(d.year); })
         .attr("y", function(d) { return y(d.points); })
         .attr("width", x.bandwidth())
         .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
         .attr("height", function(d) { return height - y(d.points); });
    });
    
    //mouseover event handler function
    function onMouseOver(d, i) {
        d3.select(this).attr('class', 'highlight').style("fill", "#69b3a2");
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth() + 5)
          .attr("y", function(d) { return y(d.points) - 10; })
          .attr("height", function(d) { return height - y(d.points) + 10; });
          svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
          svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#404080")
          svg.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline","middle")
          svg.append("text").attr("x", 220).attr("y", 160).text("variable B").style("font-size", "15px").attr("alignment-baseline","middle")

        g.append("text")
         .attr('class', 'val') 
         .attr('x', function() {
             return x(d.year);
         })
         .attr('y', function() {
             return y(d.points) - 15;
         })
         .text(function() {
             return [d.wins, +d.draws, +d.losses];  // Value of the text
         });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', x.bandwidth())
          .attr("y", function(d) { return y(d.points); })
          .attr("height", function(d) { return height - y(d.points); });

        d3.selectAll('.val')
          .remove()
    }



// Create Circle group
    // var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
    // console.log(color(0))
    // console.log(color(1))
    // console.log(color(2))
    // console.log(color(3))
    // console.log(color(4))
    // console.log(color(5))



// Mouseover / mouseout
// var hover = d3.selectAll("div")
//       .on("mouseover", function(){
//           d3.select(this)
//             .style("background-color", "orange");

//           // Get current event info
//           console.log(d3.event);
          
//           // Get x & y co-ordinates
//           console.log(d3.mouse(this));
//       })
//       .on("mouseout", function(){
//           d3.select(this)
//             .style("background-color", "steelblue")
//       });


// tooltip




// Legend function


