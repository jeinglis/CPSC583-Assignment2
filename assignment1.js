var bardata = [];
var currentContext = 0;
var behavior = ["Run", "Talk", "Kiss", "Write", "Eat", "Sleep", "Mumble", "Read",
    "Fight", "Belch", "Argue", "Jump", "Cry", "Laugh", "Shout"];
var margin = { top: 30, right: 30, bottom: 40, left: 50 }

var height = 400 - margin.top - margin.bottom,
    width = 960 - margin.left - margin.right,
    barWidth = 50,
    barOffset = 5;
draw();
function draw() {
    bardata = [];
    d3.select("svg").remove();
    d3.selectAll('.tooltip').remove();
    d3.csv('BehaviorAppropriateness.csv', function (data) {
        console.log(data[currentContext]);
        bardata.push(data[currentContext].Run);
        bardata.push(data[currentContext].Talk);
        bardata.push(data[currentContext].Kiss);
        bardata.push(data[currentContext].Write);
        bardata.push(data[currentContext].Eat);
        bardata.push(data[currentContext].Sleep);
        bardata.push(data[currentContext].Mumble);
        bardata.push(data[currentContext].Read);
        bardata.push(data[currentContext].Fight);
        bardata.push(data[currentContext].Belch);
        bardata.push(data[currentContext].Argue);
        bardata.push(data[currentContext].Jump);
        bardata.push(data[currentContext].Cry);
        bardata.push(data[currentContext].Laugh);
        bardata.push(data[currentContext].Shout);
        console.log(bardata);
        var colors = d3.scale.ordinal()
            .range(["#373854", "#493267", "#9e379f", "#e86af0", "#7bb3ff", "#011f4b",
                "#03396c", "#005b96", "#6497b1", "#b3cde0", "#a3c1ad", "#a0d6b4", "#5f9ea0",
                "#317873", "#49796b"]);

        var yScale = d3.scale.linear()
            .domain([0, 10])
            .range([0, height]);

        var xScale = d3.scale.ordinal()
            .domain(d3.range(0, bardata.length))
            .rangeBands([0, width], 0.2)

        var tooltip = d3.select('body').append('div')
            .classed("tooltip", true)
            .style('position', 'absolute')
            .style('padding', '0 10px')
            .style('background', 'white')
            .style('opacity', 0)

        var myChart = d3.select('#chart').append('svg')
            .style('background', 'white')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            .selectAll('rect').data(bardata)
            .enter().append('rect')
            .style('fill', function (d, i) {
                return colors(i);
            })
            .attr('width', xScale.rangeBand())
            .attr('x', function (d, i) {
                return xScale(i);
            })
            .attr('height', 0)
            .attr('y', height)
            .on('mouseover', function (d) {
                tooltip.transition()
                    .style('opacity', .9)

                tooltip.html(d)
                    .style('left', (d3.event.pageX - 35) + 'px')
                    .style('top', (d3.event.pageY - 30) + 'px')

                d3.select(this)
                    .style('opacity', .3)
            })
            .on('mouseout', function (d) {
                d3.select(this)
                    .style('opacity', 1)
            })

        myChart.transition()
            .attr('height', function (d) {
                return yScale(d);
            })
            .attr('y', function (d) {
                return height - yScale(d);
            })
            .delay(function (d, i) {
                return i * 20;
            })
            .duration(1000)
            .ease('elastic')

        var vGuideScale = d3.scale.linear()
            .domain([0, 10])
            .range([height, 0])

        var vAxis = d3.svg.axis()
            .scale(vGuideScale)
            .orient('left')
            .ticks(10)

        var vGuide = d3.select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        vGuide.selectAll('path')
            .style({ fill: 'none', stroke: "black" })
        vGuide.selectAll('line')
            .style({ stroke: "black" })

        var hGuideScale = d3.scale.ordinal()
            .domain(behavior)
            .rangePoints([0, width], 1)

        var hAxis = d3.svg.axis()
            .scale(hGuideScale)
            .orient('bottom');

        var hGuide = d3.select('svg').append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
        hGuide.selectAll('path')
            .style({ fill: 'none', stroke: "#000" })
    });
}

