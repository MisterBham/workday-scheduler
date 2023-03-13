// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html

let currentHour = dayjs().format("H");
let descriptionEl = document.querySelectorAll(".description");
let btnEl = document.querySelectorAll(".saveBtn");
let hourEl = document.querySelectorAll(".time-block");

$("#currentDay").text(dayjs().format("dddd MMMM Do"));

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?

$(function () {
  $(function () {
    $(btnEl).click(function () {
      let key = "hour-" + $(this).prev().attr("id");
      let value = $(this).prev().val();
      localStorage.setItem(key, value);
      $("#storage-confirm").append("Appointment added to localStorage ✅");
      $("#storage-confirm").fadeOut(2250, "swing", function () {
        $(this).empty().show();
      });
    });
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $(function setColor() {
    let descriptionEl = $(".description");
    $.each(descriptionEl, function () {
      let descriptionID = $(this).attr("id");
      if (currentHour === descriptionID) {
        $(this).addClass("present");
      } else if (currentHour > descriptionID) {
        $(this).addClass("past");
      } else if (currentHour < descriptionID) {
        $(this).addClass("future");
      }
    });
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $(function grabStorage() {
    for (var i = 0; i < hourEl.length; i++) {
      let hourElID = hourEl[i].id;
      let todo = localStorage.getItem(hourElID);
      hourEl[i].children[1].textContent = todo;
    }
  });
});
