function findAndReplace() {
/**
 * A custom function that finds and replaces all specified values in row B for URLs
 *
 * @param {Number} urlNum The number of URLs in 1 row.
 * @return {Void} creates a new sheet and copies values there.
 */
 var ss = SpreadsheetApp.getActiveSpreadsheet();
 var sheet = ss.getActiveSheet();
 var lastRow = sheet.getLastRow(); // num of rows with content
 var lastColumn = sheet.getLastColumn(); // num of columns w/ content
 var appStore = false;
 var googlePlay = false;
 var ignoreLink = false;
 var cutPosition = 0; //variable to store # of letters to the left of "/"
 //var range = ss.getRange("A1:X500");
 var val = ''; //var to hold URL values for copying
 var ui = SpreadsheetApp.getUi(); //activating User Interface options
 var countChange = 0
  
  var changedCol = 3; //column to loop through URLs
 
  for (i = 2; i<=lastRow; i++){ // i = NUMBER OF ROWS
    //URL value from origin
    val = sheet.getRange(i,changedCol).getValue(); //value in cell
    
    /* optimized version
    var firstLetters = val.substring(0,4) //first 4 letters 
    
    if ( firstLetters === "http"){ // get rid of https:// and http://
      val = val.replace("https://",""); 
      val = val.replace("http://","");
      //sheet.getRange(i,changedCol).setValue(val);
    }
    
    // variable VAL now has not http:// and https://
    
    firstLetters = val.substring(0,4) //looking for www.
    if ( firstLetters === "www."){ // get rid of www.
      val = val.replace("www.","");
    }
    */
    
    val = val.replace("https://",""); //delete http and www from the beginning
    val = val.replace("http://","");
    val = val.replace("www.","");
    
    // variable VAR now has no http://, https:// and www. in the beginning
    
    cutPosition = val.search("/")
    
    //ui.alert(cutPosition);
    
    if(cutPosition > 0){ //cut off everything after "/"
      // don't cut itunes & g-play links
      //ui.alert(val.substring(0,15))
      appStore = val.substring(0,16) === "itunes.apple.com" //is it appstore link?
      googlePlay = val.substring(0,15) === "play.google.com" //is it google play link?
      
      ignoreLink = appStore || googlePlay //ignore if either appstore or play 
      
      //ui.alert("appStore = " + appStore + "\ngooglePlay = "+googlePlay+"\nappStore || googlePlay = "+appStore || googlePlay)
      if(ignoreLink === false){ 
        //ui.alert("ignoreLink = "+ignoreLink)
        val = val.substring(0,cutPosition);
        countChange += 1;
        //ui.alert(val);
      }
    }
    
    cutPosition = val.search(",") //cut off everything after ","
    if(cutPosition > 0){
        val = val.substring(0,cutPosition);
        countChange += 1;
        //ui.alert(val);
    } 

    cutPosition = val.search(";") //cut off everything after ";"
    if(cutPosition > 0){
        val = val.substring(0,cutPosition);
        countChange += 1;
        //ui.alert(val);
    }
    
    cutPosition = val.search(" ") //cut off everything after space
    if(cutPosition > 0){
        val = val.substring(0,cutPosition);
        countChange += 1;
        //ui.alert(val);
    }
    
    cutPosition = val.search("_") //cut off everything after "_"
    if(cutPosition > 0){
        val = val.substring(0,cutPosition);
        countChange += 1;
        //ui.alert(val);
    } 
    
    //ui.alert(val);
    sheet.getRange(i,changedCol).setValue(val); // write final VAL to cell
  }
  ui.alert("The script is now done.\n"+countChange+" Changes were made\nEnjoy!")                                              
}

/*
function onOpen(e) { //add menu item on opening sheet
   SpreadsheetApp.getUi()
       .createMenu('CLEAN URLs')
       .addItem('CLEAN URLs IN COLUMN B', 'findAndReplace')
       .addSeparator()
       //.addSubMenu(SpreadsheetApp.getUi().createMenu('My sub-menu')
       //    .addItem('One sub-menu item', 'mySecondFunction')
       //    .addItem('Another sub-menu item', 'myThirdFunction'))
       .addToUi();
   
   Menu.addToUi();
 }


*/
