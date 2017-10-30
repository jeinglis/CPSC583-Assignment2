
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

d3.csv("UK-Food-trends1.csv", function(error, data) {
  if (error) throw error;
  var counter = 0;
  var root = tree(stratify(data));
  //console.log(root.links());
  var link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
      .attr("class", "link")
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
        }
        ;})
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });

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
