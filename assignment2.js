
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(" + (width / 2 + 40) + "," + (height / 2 + 90) + ")");

var count = 0;
var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

var tree = d3.tree()
    .size([2 * Math.PI, 430])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var yearTotal = 0;
 
d3.csv("UK-Food-trends-final.csv", function(error, data) {
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
              return "darkred";
              break;
          case "Dairy":
              return "darkgray";
              break; 
          case "Misc & Alcohol":
              return "blue";
              break;        
        }
        ;})
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));
      
  var tooltip = d3.select('body').append('div')
      .classed("tooltip", true)

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })
      .on('mouseover', function (d) {
                tooltip.transition()
                    .style('opacity', .9)
                tooltip.html('<h1>' + (d.id.substring(d.id.lastIndexOf(".") + 1) + '</h1>') 
                  + "<br/> 1974:  " + d.data.year1974 + d.data.unit
                  + "<br/> 1975:  " + d.data.year1975 + d.data.unit
                  + "<br/> 1976:  " + d.data.year1976 + d.data.unit
                  + "<br/> 1977:  " + d.data.year1977 + d.data.unit
                  + "<br/> 1978:  " + d.data.year1978 + d.data.unit
                  + "<br/> 1979:  " + d.data.year1979 + d.data.unit
                  + "<br/> 1980:  " + d.data.year1980 + d.data.unit
                  + "<br/> 1981:  " + d.data.year1981 + d.data.unit
                  + "<br/> 1982:  " + d.data.year1982 + d.data.unit
                  + "<br/> 1983:  " + d.data.year1983 + d.data.unit
                  + "<br/> 1984:  " + d.data.year1984 + d.data.unit
                  + "<br/> 1985:  " + d.data.year1985 + d.data.unit
                  + "<br/> 1986:  " + d.data.year1986 + d.data.unit
                  + "<br/> 1987:  " + d.data.year1987 + d.data.unit
                  + "<br/> 1988:  " + d.data.year1988 + d.data.unit
                  + "<br/> 1989:  " + d.data.year1989 + d.data.unit
                  + "<br/> 1990:  " + d.data.year1990 + d.data.unit
                  + "<br/> 1991:  " + d.data.year1991 + d.data.unit
                  + "<br/> 1992:  " + d.data.year1992 + d.data.unit
                  + "<br/> 1993:  " + d.data.year1993 + d.data.unit
                  + "<br/> 1994:  " + d.data.year1994 + d.data.unit
                  + "<br/> 1995:  " + d.data.year1995 + d.data.unit
                  + "<br/> 1996:  " + d.data.year1996 + d.data.unit
                  + "<br/> 1997:  " + d.data.year1997 + d.data.unit
                  + "<br/> 1998:  " + d.data.year1998 + d.data.unit
                  + "<br/> 1999:  " + d.data.year1999 + d.data.unit
                  + "<br/> 2000:  " + d.data.year2014 + d.data.unit
                  + "<br/> 2001:  " + d.data.year2000 + d.data.unit
                  + "<br/> 2002:  " + d.data.year2001 + d.data.unit
                  + "<br/> 2003:  " + d.data.year2002 + d.data.unit
                  + "<br/> 2004:  " + d.data.year2003 + d.data.unit
                  + "<br/> 2005:  " + d.data.year2004 + d.data.unit
                  + "<br/> 2006:  " + d.data.year2005 + d.data.unit
                  + "<br/> 2007:  " + d.data.year2006 + d.data.unit
                  + "<br/> 2008:  " + d.data.year2007 + d.data.unit
                  + "<br/> 2009:  " + d.data.year2008 + d.data.unit
                  + "<br/> 2010:  " + d.data.year2009 + d.data.unit
                  + "<br/> 2011:  " + d.data.year2010 + d.data.unit
                  + "<br/> 2012:  " + d.data.year2011 + d.data.unit
                  + "<br/> 2013:  " + d.data.year2012 + d.data.unit
                  + "<br/> 2014:  " + d.data.year2013 + d.data.unit)
                    .style('left', ( 1000) + 'px')
                    .style('top', (140) + 'px')

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
              return 8;
              break;
            case "UK Food Trends.Meats & Eggs":
              return 8;
              break;
            case "UK Food Trends.Fruits & Veg":
              return 8;
              break;
            case "UK Food Trends.Sweets":
              return 8;
              break;
            case "UK Food Trends.Fats & Oils":
              return 8;
              break;
            case "UK Food Trends.Misc & Alcohol":
              return 8;
              break;
            case "UK Food Trends.Grains":
              return 8;
              break;
          }

        if(d.id.substring(d.id.lastIndexOf(".") + 1) != "-")return 1.7; else return 0;
      });


  node.append("text")
      .attr("dy", "0.31em")
      .attr("x", function(d) { return d.x < Math.PI === !d.children ? (100 - (d.id.length *9)) : 30; })
      .attr("text-anchor", function(d) { return d.x < Math.PI ; })
      .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) *180 / Math.PI + ")"; })
      .style("font-size", "20px")
      .attr("fill", 'white')
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


