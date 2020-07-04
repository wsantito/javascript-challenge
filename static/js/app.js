var $tablehead = d3.select('#TableHead');
var $tablebody = d3.select('#TableBody');


var $searchbutton = d3.select('#search');
var $refreshbutton = d3.select('#refresh');

var alien_data = data;
let resultado = alien_data

dropdowns(DROP);

$refreshbutton.on('click', LoadData);
$searchbutton.on('click', runEnter2);

function generateDynamicTable(){
    
    //Know the the lenght of the Data
    var alien_data = data;
    var NoData = alien_data.length;

    if(NoData>0){
        

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.style.width = '90%';
        table.setAttribute('class', 'table table-striped');

        
        
        var col = []; // define an empty array
        var head = ["Date","City","State","Country","Shape","Duration","Comments"];
        for (var i = 0; i < NoData; i++) {
            for (var key in alien_data[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        
        // CREATE TABLE HEAD .
        var tHead = document.createElement("thead");	
        tHead.setAttribute('class','thead-dark')
        tHead.id = "TableHead";
        
        // CREATE ROW FOR TABLE HEAD .
        var hRow = document.createElement("tr");
        
        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");
                th.innerHTML = head[i];
                hRow.appendChild(th);
        }
        tHead.appendChild(hRow);
        table.appendChild(tHead);
        
        // CREATE TABLE BODY .
        var tBody = document.createElement("tbody");
        tBody.id = "TableBody";	
        
        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < NoData; i++) {
        
                var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
                
                
                for (var j = 0; j < col.length; j++) {
                    var td = document.createElement("td");
                    td.innerHTML = alien_data[i][col[j]];
                    bRow.appendChild(td);
                }
                tBody.appendChild(bRow)

        }
        table.appendChild(tBody);	
        
        
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("tableData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        
        console.log(divContainer)
    }	
}

// Refresh table data
function LoadData() {
    
    window.location.reload();
    // location.reload();
    // dropdowns(DROP);
    // generateDynamicTable()
    // $('input').val('');

}

function runEnter2(){
    //LoadData()

    divContainer = ""

    d3.event.preventDefault();
   
    Ifs()

    //Know the the lenght of the Data
    var NoData = resultado.length;

    if(NoData>0){
        

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        table.style.width = '90%';
        table.setAttribute('class', 'table table-striped');
       

        
        
        var col = []; // define an empty array
        var head = ["Date","City","State","Country","Shape","Duration","Comments"];
        for (var i = 0; i < NoData; i++) {
            for (var key in resultado[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        
        // CREATE TABLE HEAD .
        var tHead = document.createElement("thead");	
        tHead.id = "TableHead";

        // CREATE ROW FOR TABLE HEAD .
        var hRow = document.createElement("tr");
        
        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");
                th.innerHTML = head[i];
                hRow.appendChild(th);
        }
        tHead.appendChild(hRow);
        table.appendChild(tHead);
        
        // CREATE TABLE BODY .
        var tBody = document.createElement("tbody");
        tBody.setAttribute("id","TableBody");
        tBody.id = "TableBody";
	
        
        // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
        for (var i = 0; i < NoData; i++) {
        
                var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
                
                
                for (var j = 0; j < col.length; j++) {
                    var td = document.createElement("td");
                    td.innerHTML = resultado[i][col[j]];
                    bRow.appendChild(td);
                }
                tBody.appendChild(bRow)

        }
        table.appendChild(tBody);	
        
        
        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("tableData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        
    }
 
}

function dropdowns(callback) {

    var datalist_ids = [];

    d3.selectAll('datalist').each(function(d) {
        datalist_ids.push('#' + this.id);
    });

    if (d3.selectAll('option').empty()) {

        try {
            callback(datalist_ids);
        }
        catch (error) {
            console.log(error);
        }
    }

    else  {
            d3.selectAll('.dropoptions').remove();
        
        try {
            callback(datalist_ids);
        }
        catch (error) {
            console.log(error);
        }
    }
}

function DROP(d) {
    inpKeys = Object.keys(alien_data[0]);
        // add one more datetime to the array
    //inpKeys.unshift(Object.keys(alien_data[0])[0]);

    inpKeys.forEach((key, index) => {
            
        var datalist = alien_data.map(item => item[key]).filter((v, i, a) => a.indexOf(v) === i);
        //console.log("datalist",datalist)
        datalist.forEach(value => {
            var option = d3.select(d[index]).append('option');
            option.attr('value', value);
            option.attr('class', 'dropoptions');
                    
        });
        
    });
}

function Ifs() {

    let inputValueDS = d3.select("#date-start").property("value");
    console.log("ValorDS",inputValueDS)
    let inputValueCI = d3.select("#city").property("value");
    console.log("ValorCI",inputValueCI)
    let inputValueST = d3.select("#state").property("value");
    console.log("ValorST",inputValueST)
    let inputValueCO = d3.select("#country").property("value");
    console.log("ValorCO",inputValueCO)

    if(inputValueDS === ""){
        if (inputValueCI === ""){
            if (inputValueST === ""){
                if (inputValueCO === ""){
                    window.location.reload();
                    alert("Please Set search values")
                    console.log("Sin Inputs")
                }else{
                resultado = resultado.filter(d=> d.country===inputValueCO);
                console.log("Solo CO", resultado)    
                }
            }else{
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    console.log("Solo ST ", resultado)
                }else{
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("ST y CO", resultado) 
                }
            }
        }else{
            if(inputValueST === ""){
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.city===inputValueCI);
                    console.log("Solo CI", resultado)
                }else{
                    resultado = resultado.filter(d=> d.city===inputValueCI);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("CI y CO", resultado)
                }
            }else{
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    console.log("CI y ST", resultado)
                }else{
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("CI, ST y CO", resultado)
                }
            }
        }
    }else{
        if (inputValueCI === ""){
            if (inputValueST === ""){
                if (inputValueCO === ""){
                    resultado = resultado.filter(d=> d.datetime===inputValueDS);
                    console.log("Solo DS")
                }else{
                resultado = resultado.filter(d=> d.country===inputValueCO);
                console.log("DS y CO", resultado)    
                }
            }else{
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    console.log("DS y ST ", resultado)
                }else{
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("DS, ST y CO", resultado) 
                }
            }
        }else{
            if(inputValueST === ""){
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.city===inputValueCI);
                    console.log("DS y CI", resultado)
                }else{
                    resultado = resultado.filter(d=> d.city===inputValueCI);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("DS, CI y CO", resultado)
                }
            }else{
                if(inputValueCO === ""){
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    console.log("DS, CI y ST", resultado)
                }else{
                    resultado = resultado.filter(d=> d.state===inputValueST);
                    resultado = resultado.filter(d=> d.country===inputValueCO);
                    console.log("DS, CI, ST y CO", resultado)
                }
            }
        }
    }
}