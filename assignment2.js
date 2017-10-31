
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

var count = 0;
var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var tree = d3.tree()
    .size([2 * Math.PI, 1600])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var sliderValue = 1974
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  sliderValue = slider.value;
}

var yearTotal = 0;
 
d3.csv("UK-Food-trends1.csv", function(error, data) {
  if (error) throw error;
  var counter = 0;
  var root = tree(stratify(data));
  var link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
      .style("opacity", function(d){
        console.log(yearTotal);
        if(d.source.id == "UK Food Trends"){
            yearTotal = d.source.data.year2014;
        }
        var year = "year"+sliderValue;
        switch (d.target.id.split('.')[1]){
            case "Fats & Oils":
              return (d.target.data.year/yearTotal);
              break;
            case "Fruits & Veg":
              return (d.target.data.year/yearTotal);
              break;
            case "Grains":
              return (d.target.data.year/yearTotal);
              break;
          case "Sweets":
              return (d.target.data.year/yearTotal);
              break;
          case "Meats & Eggs":
              return (d.target.data.year/yearTotal);
              break;
          case "Dairy":
              return (d.target.data.year/yearTotal);
              break; 
          case "Misc & Alcohol":
              return (d.target.data.year/yearTotal);
              break;        
        }

      })
      .style("stroke", function(d){
          switch (d.target.id.split('.')[1]){
            case "Fats & Oils":
              return "orange";
              break;
            case "Fruits & Veg":
              return "green";
              break;
            case "Grains":
              return "#8c2f1b";
              break;
          case "Sweets":
              return "purple";
              break;
          case "Meats & Eggs":
              return "red";
              break;
          case "Dairy":
              return "blue";
              break; 
          case "Misc & Alcohol":
              return "yellow";
              break;        
        }
        ;})
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));
      
  var tooltip = d3.select('body').append('div')
      .classed("tooltip", true)
      .style('position', 'absolute')
      .style('padding', '40px 20px')
      .style('background', 'white')
      .style('opacity', 0)
      .style('font-size','50px')
      .style('font-family', 'Roboto Slab')
      .style('height', '2200px')
      .style('margin-top', '30px')
      .style('line-height', '100%')

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })
      .on('mouseover', function (d) {
                tooltip.transition()
                    .style('opacity', .9)
                tooltip.html(d.id.substring(d.id.lastIndexOf(".") + 1) 
                  + "<br/> 1974:  " + d.data.year1974 + "grams"
                  + "<br/> 1975:  " + d.data.year1975 + "grams"
                  + "<br/> 1976:  " + d.data.year1976 + "grams"
                  + "<br/> 1977:  " + d.data.year1977 + "grams"
                  + "<br/> 1978:  " + d.data.year1978 + "grams"
                  + "<br/> 1979:  " + d.data.year1979 + "grams"
                  + "<br/> 1980:  " + d.data.year1980 + "grams"
                  + "<br/> 1981:  " + d.data.year1981 + "grams"
                  + "<br/> 1982:  " + d.data.year1982 + "grams"
                  + "<br/> 1983:  " + d.data.year1983 + "grams"
                  + "<br/> 1984:  " + d.data.year1984 + "grams"
                  + "<br/> 1985:  " + d.data.year1985 + "grams"
                  + "<br/> 1986:  " + d.data.year1986 + "grams"
                  + "<br/> 1987:  " + d.data.year1987 + "grams"
                  + "<br/> 1988:  " + d.data.year1988 + "grams"
                  + "<br/> 1989:  " + d.data.year1989 + "grams"
                  + "<br/> 1990:  " + d.data.year1990 + "grams"
                  + "<br/> 1991:  " + d.data.year1991 + "grams"
                  + "<br/> 1992:  " + d.data.year1992 + "grams"
                  + "<br/> 1993:  " + d.data.year1993 + "grams"
                  + "<br/> 1994:  " + d.data.year1994 + "grams"
                  + "<br/> 1995:  " + d.data.year1995 + "grams"
                  + "<br/> 1996:  " + d.data.year1996 + "grams"
                  + "<br/> 1997:  " + d.data.year1997 + "grams"
                  + "<br/> 1998:  " + d.data.year1998 + "grams"
                  + "<br/> 1999:  " + d.data.year1999 + "grams"
                  + "<br/> 2000:  " + d.data.year2014 + "grams"
                  + "<br/> 2001:  " + d.data.year2000 + "grams"
                  + "<br/> 2002:  " + d.data.year2001 + "grams"
                  + "<br/> 2003:  " + d.data.year2002 + "grams"
                  + "<br/> 2004:  " + d.data.year2003 + "grams"
                  + "<br/> 2005:  " + d.data.year2004 + "grams"
                  + "<br/> 2006:  " + d.data.year2005 + "grams"
                  + "<br/> 2007:  " + d.data.year2006 + "grams"
                  + "<br/> 2008:  " + d.data.year2007 + "grams"
                  + "<br/> 2009:  " + d.data.year2008 + "grams"
                  + "<br/> 2010:  " + d.data.year2009 + "grams"
                  + "<br/> 2011:  " + d.data.year2010 + "grams"
                  + "<br/> 2012:  " + d.data.year2011 + "grams"
                  + "<br/> 2013:  " + d.data.year2012 + "grams"
                  + "<br/> 2014:  " + d.data.year2013 + "grams")
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top', (d3.event.pageY - 30) + 'px')

                d3.select(this)
                    .style('opacity', .3)
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .style('opacity', 1)
            });

  node.append("circle")
      .attr("r", function(d){ 
          switch(d.id){
            case "UK Food Trends.Dairy":
              return 20;
              break;
            case "UK Food Trends.Meats & Eggs":
              return 20;
              break;
            case "UK Food Trends.Fruits & Veg":
              return 20;
              break;
            case "UK Food Trends.Sweets":
              return 20;
              break;
            case "UK Food Trends.Fats & Oils":
              return 20;
              break;
            case "UK Food Trends.Misc & Alcohol":
              return 20;
              break;
            case "UK Food Trends.Grains":
              return 20;
              break;
          }

        if(d.id.substring(d.id.lastIndexOf(".") + 1) != "-")return 10.5; else return 0;
      });


  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", function(d) { return d.x < Math.PI === !d.children ? (300 - (d.id.length *30)) : 60; })
      .attr("text-anchor", function(d) { return d.x < Math.PI ; })
      .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) *180 / Math.PI + ")"; })
      .style("font-size", "80px")
      .style("text-shadow", "3pd 20px white")
      .text(function(d) { 
          switch(d.id){
            case "UK Food Trends.Dairy":
              return"Dairy";
              break;
            case "UK Food Trends.Meats & Eggs":
              return"Meats & Eggs";
              break;
            case "UK Food Trends.Fruits & Veg":
              return"Fruits & Veg";
              break;
            case "UK Food Trends.Sweets":
              return"Sweets";
              break;
            case "UK Food Trends.Fats & Oils":
              return"Fats & Oils";
              break;
            case "UK Food Trends.Misc & Alcohol":
              return"Misc & Alcohol";
              break;
            case "UK Food Trends.Grains":
              return"Grains";
              break;
          }
        });
});

function radialPoint(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}


