function typSelection(data)
{

//$('#filterTyp').show();
var w = 360,
h = 250
 
//item Typ.1.1
//############################################################
//die naechsten Zeilen sind wichtig fuer die Interaktion     #
//der svg #typ identifiziert die diafacetype Selektion       #
//wenn diese Funktion aufgerufen werden soll, dann muss im   #
//ausfuehrenden Skript die folgende Bedingung gesetzt werden:#
// <div id="typ"></div>                                 #
//############################################################

var svg = d3.select("#typ").append("svg:svg")
.attr("class", "chart")
.attr("width", w)
.attr("height", h )
.append("svg:g")
.attr("transform", "translate(10,170)");
 
x = d3.scale.ordinal().rangeRoundBands([0, w-20])
y = d3.scale.linear().range([0, h-20])
z = d3.scale.ordinal().range(["blue"])

//Zwei Spalten (id, Anzahl der Sonnenuhren)

var matrixTyp = [
[ 1, 22],
[ 2, 12],
[ 3, 9],
[4, 8]
];

var remapped =["c1"].map(function(dat,i){
return matrixTyp.map(function(d,ii){
return {x: ii, y: d[i+1] };
})
});
var stacked = d3.layout.stack()(remapped)
x.domain(stacked[0].map(function(d) { return d.x; }));
y.domain([0, d3.max(stacked[stacked.length - 1], function(d) { return d.y0 + d.y; })]);
 

var valgroup = svg.selectAll("g.valgroup")
.data(stacked)
.enter().append("svg:g")
.attr("class", "valgroup")
.style("fill", function(d, i) { return z(i); })
.style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });

var list=["sphere", "convex","sphere", "convex"];
var label = svg.selectAll("text")
      .data(x.domain())
      .enter().append("svg:text")
      .attr("x", function(d) { return x(d) + x.rangeBand() / 2; })
      .attr("y", 6)
      .attr("text-anchor", "middle")
      .attr("dy", ".71em")
      .text(function(d) {return list[d]});

var typ="None";
var crossdata;
var tag;
//d3.json("crossdata1.json", function(json) 
d3.json("https://dl.dropboxusercontent.com/u/103327358/crossfilter.json", function(json) 
{
    var checkTyp=[];
    var falseTyp=[];
    crossdata=json;
    var xf = crossfilter(crossdata);
    var tags = xf.dimension(function(d) {
	    return d.tags});
    
// Add a rect for each date.
    var rect = valgroup.selectAll("rect")
	.data(function(d){return d;})
	.enter().append("svg:rect")
	.on("click", function(d){
		checkTyp=[];
		//falseTyp=[];
		typ=list[d.x];
		tags.filter(function(d) {
			tag=d.indexOf(typ);
			if(tag==1) {checkTyp.push(d[0])};
			if(tag!=1) {checkTyp.push(-1)};
		    });
		filterLogicTyp(checkTyp,data, typ);
	    })
	.attr("x", function(d) { return x(d.x); })
	.attr("y", function(d) { return -y(d.y0) - y(d.y); })
	.attr("height", function(d) { return y(d.y); })
	.attr("width", x.rangeBand());
    
    });

};




