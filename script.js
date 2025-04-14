let table = document.getElementsByClassName("sheet-body")[0],
rows = document.getElementsByClassName("rows")[0],
columns = document.getElementsByClassName("columns")[0],
tableExists = false;

const generateTable = () => {
    let rowsNumber = parseInt(rows.value), columnsNumber = parseInt(columns.value)
    table.innerHTML = ""
    if(rowsNumber > 0 && columnsNumber > 0){
        for(let i=0; i<rowsNumber; i++){
            var tableRow = ""
            for(let j=0; j<columnsNumber; j++){
                tableRow += `<td contenteditable></td>`
                //If you add contenteditable="true" to an element, the user can click on it and edit its content, like typing text or deleting it.
            }
            table.innerHTML += tableRow
        }
        if(rowsNumber>0 && columnsNumber>0){
            tableExists = true
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "please enter the number of rows and the number of columns!",
            });
    }
    
}

const ExportToExcel = (type, fn, dl) => {
    if(!tableExists){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "There is no table to export!",
            });
        return
    }
    var elt = table
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" })  //SheetJS (XLSX) to convert the HTML <table> into an Excel workbook object.
    return dl ?
            XLSX.write(wb, { 
                bookType: type,         // file type like 'xlsx'or 'csv' ...
                bookSST: true,          // shared string table for better performance (Excel feature)
                type: 'base64' })       // output format will be base64 encoded string
            : XLSX.writeFile(wb, fn || ('MyNewSheet.' + (type || 'xlsx')))  //Automatically triggers download of the Excel file. and fn is not provided, it uses default "MyNewSheet.xlsx"
}

// make functions accessible from the global scope
// window.generateTable = generateTable;
// window.ExportToExcel = ExportToExcel;



// sheetJs library

//    Part                 	         Meaning
// table_to_book()      	Converts an HTML table to an Excel workbook
// XLSX.writeFile()      	Downloads the file directly
// XLSX.write()	            Returns it as base64 for custom uses
