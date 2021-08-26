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

legendary();

// Data
d3.json('../../data/data.json').then(function( data ){
  console.log(data);

  var time_parse = d3.timeParse('%Y');
  var time_format = d3.timeFormat('%Y');

  data.forEach(function(e, i){
    data[i].year = time_parse(e.year);
  });

  // Set scales
  var x_scale = d3.scaleTime()
         .domain([
           d3.min(data, function(d){
             return d.year;
           }),
           d3.max(data, function(d){
             return d.year;
           })
         ])
         .nice()
         .range([margin.left, width - margin.left]);

  var yMax = d3.max(data, function(d){
    return d.points;
  });

  var y_scale = d3.scaleLinear()
      .domain([
        0, yMax * 1.2
      ])
      .nice()
      .range([height - margin.top, margin.bottom]);

  // Create axes
  var xAxis = d3.axisBottom(x_scale)
      .ticks(10)
      .tickFormat(function(d){
        return time_format(d);
      });

  var yAxis = d3.axisLeft(y_scale)
      .ticks(10);

  // Append the axes as G
  svg.append('g')
      .attr('transform', 'translate(0,' + (height - margin.top) + ')')
      .call(xAxis);

  svg.append('text')
      .attr('transform', 'translate(' + (width/2) + ',' + (height + margin.top + margin.bottom) + ')')
      .style('text-anchor', 'middle')
      .text('Season');

  svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(yAxis);

  svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 5)
      .attr('x', 0-(height/2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Chelsea FC Points Per Season');

  // Set up the line drawing function
  var points_line = d3.line()
      .x(function(d){
        return x_scale( d.year );
      })
      .y(function(d){
        return y_scale( d.points );
      });

  var wins_line = d3.line()
      .x(function(d){
        return x_scale( d.year );
      })
      .y(function(d){
        return y_scale( d.wins );
      });

  // Append the two lines and circle groups to the svgWidth
  createLine(points_line, '#0000FF', 'p_line');
  createLine(wins_line, '#00FFFF', 'w_line');

  // Append all three circle groups to the svgWidth
  createCircleGroup('points', '#0000FF', 'p_scatter');
  createCircleGroup('wins', '#00FFFF', 'w_scatter');

  // Function createLine
  function createLine(filter, color, name) {
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 3)
        .attr('d', filter)
        .attr('class', name);
  }

  // Function createCircleGroup
  function createCircleGroup(y_flavor, color, name) {
    if (y_flavor == 'points'){
      svg.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d){
          return x_scale( d.year );
        })
        .attr('cy', function(d){
          return y_scale( d.points );
        })
        .attr('r', 5)
        .attr('fill', function(d){
            if (d.other.trophy){
              if (d.other.trophy == 'Premiership Champions'){
                return '#FFDF00';
              } else {
                return color;
              }
            } else {
              return color;
            }
          })
        .attr('stroke', '#000000')
        .attr('class', name)
        .style('visibility', 'visible')
        .style('pointer-events', 'all')
        .on('mouseover', mouseover);
        //.on('mouseleave', mouseout);
    } else if (y_flavor == 'wins'){
      svg.append('g')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', function(d){
                return x_scale( d.year );
            })
            .attr('cy', function(d){
                return y_scale( d.wins );
            })
            .attr('r', 5)
            .attr('fill', function(d){
            if (d.other.trophy){
              if (d.other.trophy == 'Premiership Champions'){
                return '#FFDF00';
              } else {
                return color;
              }
            } else {
              return color;
            }
          })
        .attr('stroke', '#000000')
            .attr('class', name)
            .style('visibility', 'visible')
            .style('pointer-events', 'all')
            .on('mouseover', mouseover);
            //.on('mouseleave', mouseout);
    }
    }

});

 // Mouseover
 function mouseover() {

    let ugga_mugga = d3.select(this)._groups[0][0].__data__;
    let selector = d3.select(this)._groups[0][0].classList[0];
  console.log(selector);
  selector = selector.slice(0, 1);
    selector = '.' + selector + '_line';

    d3.select( selector )
        .transition()
        .duration(750)
        .attr('stroke-width', 6);

    d3.select(this)
        .transition()
        .duration(1000)
        .attr('r', 9);

    // Create the tooltip
  let time_format = d3.timeFormat('%Y');
  let trophy = (ugga_mugga.other.trophy) ? ugga_mugga.other.trophy : 'None';

    tooltip.transition()
         .duration( 250 )
         .style( "opacity", 0.85 )
         .style("left", (d3.event.pageX + 20) + "px")
         .style("top", (d3.event.pageY - 90) + "px");
     tooltip.html(
         "<table><tbody><tr><td class='wide'><strong>Season:</strong></td><td align='right'>" + time_format(ugga_mugga.year) + "</td></tr>" +
         "<tr><td class='wide'><strong>Points:</strong></td><td align='right'>" + ugga_mugga.points + "</td></tr>" +
         "<tr><td class='wide'><strong>W | D | L:</strong></td><td align='right'>" + ugga_mugga.wins + ' | ' + ugga_mugga.draws + ' | ' + ugga_mugga.losses + "</td></tr>" +
         "<tr><td class='wide'><strong>Finished:</strong></td><td align='right'>" + ugga_mugga.other.finished + "</td></tr>" +
         "<tr><td class='wide'><strong>Coach:</strong></td><td align='right'>" + ugga_mugga.other.coach + "</td></tr>" +
         "<tr><td class='wide'><strong>Trophy:</strong></td><td align='right'>" + trophy + "</td></tr></tbody></table>"
     );
 }


 // Mouseout
 function mouseout() {
    let selector = d3.select(this)._groups[0][0].classList[0];
    selector = selector.slice(0, 1);
    selector = '.' + selector + '_line';

    d3.select( selector )
        .transition()
        .duration(750)
        .attr('stroke-width', 3);

    d3.select(this)
        .transition()
        .duration(1000)
        .attr('r', 5 );

     // Fade out tooltip
     tooltip.transition()
            .duration( 250 )
            .style( "opacity", 0 );
 }



 // Legend Function
 function legendary() {
   // Legend setup
   var legendText = ['Points', 'Wins'];
   var legendColors = ['#00FFFF', '#0000FF'];
   let legend_height = 50;
   let legend_width = 275;
   let legend_margin = (margin.left + width)/2 - legend_width/2 - 30;

   // Append the legend
   var legend_box = d3.select('body')
                 .append('svg')
                 .attr( 'height', legend_height )
                 .attr( 'width', legend_width )
                 .style('margin-left', legend_margin + 'px')
                 .style( 'background-color', '#ffffff' )
                 .style('margin-top', '10px');

   var legend = legend_box.append('g')
                 .attr('id', 'legend')
                 .attr( 'height', legend_height )
                 .attr( 'width', legend_width );

   legend.append('rect')
         .attr('x', 0)
         .attr('y', 0)
         .attr('height', legend_height )
         .attr('width', legend_width )
         .attr('fill', 'none')
         .attr('stroke', '#000000')
         .attr('stroke-width', '1px');

   legend.append('text')
         .attr('x', legend_width/2)
         .attr('y', 15)
         .style('font-size', '12px')
         .style('text-anchor', 'middle')
         .style('font-weight', 'bold')
         .text('Legend');

   var legenditem = legend.selectAll(".legenditem")
    .data(d3.range(2))
    .enter()
    .append("g")
        .attr("class", "legenditem")
        .attr("transform", function(d, i) { return "translate(" + (i * 160) + ",25)"; });

   legenditem.append("rect")
    .attr("x", 15)
    .attr("y", 0)
    .attr("width", 15)
    .attr("height", 15)
    .attr("class", "rect")
    .style("fill", function(d, i) { return legendColors[i]; });

   legenditem.append("text")
    .attr("x", 35)
    .attr("y", 12)
    .style('font-size', '12px')
    .text(function(d, i) { return legendText[i]; });
 }
