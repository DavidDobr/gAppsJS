function onEdit() {
  var s = SpreadsheetApp.getActiveSheet();
  if( s.getName() == "ENRICHMENT" ) { //checks that we're on the correct sheet
    var r = s.getActiveCell();
    if( r.getColumn() != 2 ) { //checks the edited column 
      var nextCell = s.getRange(r.getRow(),2);
      if( nextCell.getValue() === '' ) //is empty?
        nextCell.setValue(new Date());
    }
  }
}
