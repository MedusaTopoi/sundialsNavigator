var CheckDatum=[];
var CheckTyp=[];
var Material=[];
var Datum=[];
var Typ=[];
var CheckMaterial=[];
var filterdata;
var Filterdata;

function filterLogicMaterial(checkMaterial,data, material)
{
    
    var svg = d3.select("#filterLogikMaterial").append("svg:svg");
    CheckMaterial=checkMaterial;
    Material=material;
    filterAll(CheckMaterial);
};

function filterLogicDatum(checkDatum,data, datum)
{
    var svg = d3.select("#filterLogikDatum").append("svg:svg");
    CheckDatum=checkDatum;
    Datum=datum;
    filterAll(CheckDatum);
};

function filterLogicTyp(checkTyp,data, typ)
{
    var svg = d3.select("#filterLogikTyp").append("svg:svg");
    CheckTyp=checkTyp;
    Typ=typ;
    filterAll(CheckTyp);

};
function filterAll()
{
    var filterdata=[];
    var filterDatum=[];
    var filterMaterial=[];
    var filterTyp=[];
    var filterDatumMaterial=[];
    var filterDatumTyp=[];
    var filterTypMaterial=[];
  
    for(var d=0;d<528; d++)
  {
  	
  	    
  	
	    //single trigger-------------------------------------------------
	    if(CheckDatum[d]!=-1) {filterDatum.push(data[d]);}
	    if(CheckMaterial[d]!=-1) {filterMaterial.push(data[d]);}
	    if(CheckTyp[d]!=-1) {filterTyp.push(data[d]);}
	    //double trigger-------------------------------------------------
	    if((CheckMaterial[d]!=-1 && CheckDatum[d]!=-1
		&& CheckMaterial[d]==CheckDatum[d])) {filterDatumMaterial.push(data[d]);}
	    if((CheckDatum[d]!=-1 && CheckTyp[d]!=-1
		&& CheckDatum[d]==CheckTyp[d])) {filterDatumTyp.push(data[d]);}
	    if((CheckTyp[d]!=-1 && CheckMaterial[d]!=-1
		&& CheckTyp[d]==CheckMaterial[d])) {filterTypMaterial.push(data[d]);}
	    //full trigger-------------------------------------------------
	    if((CheckMaterial[d]!=-1 && CheckDatum[d]!=-1 && CheckTyp[d]!=-1
		&& CheckMaterial[d]==CheckDatum[d] &&  CheckMaterial[d]==CheckTyp[d]))
		{
			//filterdata.push(data[d]);
		
		} 
	};
    
   	console.log("neuer Filter++++++++++++++++++");
    	console.log("Laenge der SundialsDatenbank im Filter: "+data.length);
    	console.log("gesamter Filter (Material,Typ,Datum): "+filterdata.length);
    	console.log("Material("+Material+"): "+filterMaterial.length);
    	console.log("Datum("+Datum+"): "+filterDatum.length);
    	console.log("Typ:("+Typ+"): "+filterTyp.length);
    	console.log("Typ:("+Typ+") & Material("+Material+"): "+filterTypMaterial.length);
    	console.log("Material("+Material+") & Datum("+Datum+"): "+filterDatumMaterial.length);
    	console.log("Datum("+Datum+") & Typ("+Typ+"): "+filterDatumTyp.length);
        filterdata = [{"ID":"1","dating":"1st cent. CE","material":"marble ","dialface_shape":"sphere","site":"Altino","location":"Altino"}];
       	SundialsListCtrl(filterdata);

   };

function SundialsListCtrl(filterdata) {
		//filterdata = [{"ID":"1","dating":"1st cent. CE","material":"marble ","dialface_shape":"sphere","site":"Altino","location":"Altino"}];
		alert("wert: "+filterdata);
		//$scope.sundials = filterdata;
	};	
