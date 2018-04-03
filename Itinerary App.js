 

function getWeeklyEvents() {
  //This code block contains most of the variables needed for the function.
  var today = new Date();  //This sets the variable to today, the first date used in the date range
  var week = addDaysToDate(today, 13);  //This uses the nested function below to create the variable for the end of the date range.  The number is the number of days from today.  
  var myCalendar = CalendarApp.getCalendarById('email@gmail.com');  //Retrieves my calendar

  var newSheet = SpreadsheetApp.create('temp'); //Creates a spreadsheet to iterate the event details onto
  var tempSheet = newSheet.getActiveSheet(); //Activates the first sheet in the spreadsheet just created
  var times = tempSheet.getRange("B:C"); //Selects the range that the time and date information are printed into so the format can be changed.
  var e = myCalendar.getEvents(today, week);//.concat(herCalendar.getEvents(today, week));  //Searches for all events within the defined date range
  
  //This code block iterates over var 'e' and prints the details in consecutive rows
  if ( e.length > 0) {
    var info = tempSheet.getRange("A1").setValue("Today is:");
    var currentDate = tempSheet.getRange("B1").setValue(today);
    var boldStyles = [['bold', 'bold', 'bold']];
    var grayStyles = [['#c0c0c0', '#c0c0c0', '#c0c0c0']];
    var leftStyles = [['left', 'left', 'left']];
    var topStyles = [['top', 'top', 'top']];
    var topRow = tempSheet.getRange("A1:C1");
    var wrap = [[true, true, true]];
    topRow.setFontWeights(boldStyles);
    topRow.setBackgrounds(grayStyles);
    topRow.setWraps(wrap);
    topRow.setHorizontalAlignments(leftStyles);
    topRow.setVerticalAlignments(topStyles);
    
    
    
 for (var i=0;i<e.length;i++) {
   
    var details=[[e[i].getTitle(), e[i].getStartTime(), e[i].getEndTime()]];
    var row=i+1;
    var range=tempSheet.getRange(row+1,1,1,3);
    var range2 = range.setValues(details);
   range2.setHorizontalAlignments(leftStyles);
   range2.setVerticalAlignments(topStyles);
   range2.setWraps(wrap);
  
 
 
 
 }
    //end of the iteration
  
 var range3 = tempSheet.getRange(1,1,e.length+1,3); //Selects all events in spreadsheet
 var sortRange = tempSheet.getRange(2,1,e.length+1,3);   
   sortRange.sort(2);
  
    
    times.setNumberFormat("ddd M/d H:mm");  //uses the times variable set above to format the date and time of the event details
    var allEvents = SheetConverter.convertRange2html(range3);  //Uses the SheetConverter library to convert the range of event details into html
    
   GmailApp.sendEmail('email@gmail.com', 'Your Itinerary, Sir', "", {htmlBody: "<html><body>"+allEvents+"</body></html>"}) //Sends an email with the html version of your event details in the body
   DriveApp.getFilesByName('temp').next().setTrashed(true);}  //Deletes the spreadsheet used earlier
     
  else {
    GmailApp.sendEmail('email@gmail.com', 'Good Morning, Sir', 'There is nothing on your agenda')
  }


//This nested function creates a date relative to today
function addDaysToDate(date,d){
  // d = number of day to add and date = start date
  var result = new Date(date.getTime()+d*(24*3600*1000));
  return result
}
  
}

