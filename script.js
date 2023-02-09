$(function () {
  // time is in 24 hour 00 format so if u want to test diffrent times add .time(##) to the end of time = dayjs
  var time = dayjs();
  var timeSlot = $('*#timeBlock');
  var saveBtn = $('*.saveBtn');

  // itterates throguh each time slot 
  timeSlot.each(function () {
    var hourSlot = $(this).attr('data-hour');
    var textArea = $(this).children('textarea');
    var storageId = localStorage.getItem(hourSlot);

    //set the text of each timslot based on what's in local storage
    if (storageId == null) {
      textArea.text("");
    } else {
      textArea.text(storageId);
    };

    //sets the class to present past and future for each time block based on current time
    if (time.format('HH') == hourSlot) {
      $(this).attr("class", "row time-block present");
    } else if (time.format('HH') > hourSlot) {
      $(this).attr("class", "row time-block past");
    } else if (time.format('HH') < hourSlot) {
      $(this).attr("class", "row time-block future");
    };
  });

  //saves/updates the local storage for the text inside each time block 
  saveBtn.on('click', function (event) {
    event.preventDefault();
    var text = $(this).siblings('textarea').val();
    var ID = $(this).parent('#timeBlock').attr('data-hour');
    localStorage.setItem(ID, text);
  });

  //displays the current date in the header of the page. (day month date)
  $('#currentDay').text(dayjs().format('dddd, MMMM D YYYY'));
});
