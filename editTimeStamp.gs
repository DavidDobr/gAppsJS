function onEdit() {
  var colNum = 3  // hard coded number of column to put the date in  
  var s = SpreadsheetApp.getActiveSheet();
  if( s.getName() === "ENRICHMENT" || s.getName() === "TRANSFER" ) { //checks that we're on the correct sheet
    var r = s.getActiveCell(); // r is our active cell
    if( r.getColumn() !== colNum ) { //checks the edited column 
      var nextCell = s.getRange(r.getRow(), colNum); // next cell will be on the same row in 2nd column
      if( nextCell.getValue() === '' ) // is nextCell empty?
        nextCell.setValue(new Date());  // add current timestamp & date to second column
    }
  }
}
