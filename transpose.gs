/**
 * A custom function that transposes ALL values up to specified row
 *
 * @param {Number} urlNum The number of URLs in 1 row.
 * @return {Void} creates a new sheet and copies values there.
 *
 * @version: 1.1
 * Change log:
 * 
 * ==== DONE ====
 * script now automatically detects # of row and columns to transpose
 * only 'input' row untouchable: a new sheet is created and populated every time
 * added action menu "Transpose"
 * script adapted for 2 unchangeable columns
 
 * ==== ADD IN THE FUTURE =======
 * Choose b/w 1 and 2 unchangeable columns
 * Choose unchangeable columns from a drop-down list on script launch
 * add prompt: "Num of row, columns; Continue? YES/NO "
 */

 // Add a custom menu to the active document, including a separator and a sub-menu.

function simpleTranspose() {
  
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getActiveSheet();
 var lastRow = sheet.getLastRow(); // num of rows with content
 var lastColumn = sheet.getLastColumn(); // num of columns w/ content
 var range = ss.getRange("A1:X500");
 var val = ''; //var to hold URL values for copying

var ui = SpreadsheetApp.getUi(); //activating User Interface options
  ui.alert("LastRow: "+lastRow + "\nLastColumn: "+lastColumn);

  ss.insertSheet(0); //inserting a sheet for transpose output
  var name = ss.getSheets()[0].getSheetName(); // getting the name of new sheet
  ui.alert("Output will be in sheet named "+name);
  
  //copying 1st row names
  for (j = 1; j<=3; j++){
    val = sheet.getRange(1,j).getValue()
    ss.getSheetByName(name).getRange(1,j).setValue(val)  
  }
    
/*#####################################################
# 2 COLUMNS FOR NAMES; 3 Column onwards - FOR URLS  #
#######################################################*/
  var rCounter = 2; //counter for filling rows on new sheet
  var cCounter = 3;//counter for alternateing b/w name and URL
  for (i = 2; i<=lastRow; i++){ // i = NUMBER OF ROWS
    var idString1 = sheet.getRange(i,1).getValue(); // first column id
    var idString2 = sheet.getRange(i,2).getValue(); // second column id
    for (j=3; j<=lastColumn; j++){ // J = NUMBER OF COLUMNS
      
      //URL value from origin
      val = sheet.getRange(i,j).getValue();
      
      //if NO URL, go on to next row
      if (val.length === 0){
          break; 
      }
      //Pasting IDs
      ss.getSheetByName(name).getRange(rCounter,1).setValue(idString1)
      ss.getSheetByName(name).getRange(rCounter,2).setValue(idString2)
      
      //pasting URLs
      ss.getSheetByName(name).getRange(rCounter, cCounter).setValue(val);
      rCounter += 1;
    }
  }
  
  ui.alert("The script is now done. Enjoy!")
}
