function onOpen(e) { //add menu item on opening sheet
   SpreadsheetApp.getUi()
       .createMenu('Custom SCRIPTS')
       .addItem('CLEAN URLs IN COLUMN C', 'findAndReplace')
       .addSeparator()
       //.addSubMenu(SpreadsheetApp.getUi().createMenu('My sub-menu')
       //    .addItem('One sub-menu item', 'mySecondFunction')
       //    .addItem('Another sub-menu item', 'myThirdFunction'))
       .addItem('Transpose active sheet', 'simpleTranspose')
       .addToUi();
   
   Menu.addToUi();
 }
