const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate'); // New Update Button
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var destination = document.getElementById('destination'); // Destination input
var travelDate = document.getElementById('travelDate');   // Date input
var notes = document.getElementById('notes');             // Notes input
var weather = document.getElementById('weather'); // Weather input
var activities = document.getElementById('activities'); // Activities input

let pathName = path.join(__dirname, 'Files');

weather.addEventListener('change', function() {
  switch (weather.value) {
    case 'hot':
      activities.value = "Swimming, Beach Volleyball, Sunbathing";
      break;
    case 'warm':
      activities.value = "Hiking, Picnic, Cycling";
      break;
    case 'fall':
      activities.value = "Leaf Peeping, Apple Picking, Hayrides";
      break;
    case 'cold':
      activities.value = "Skiing, Ice Skating, Snowboarding";
      break;
    default:
      activities.value = "";
  }
});

btnCreate.addEventListener('click', function(event) {
  let file = path.join(pathName, fileName.value);
  let contents = `Destination: ${destination.value}\nDate: ${travelDate.value}\n\nNotes:\n${notes.value}\n\nWeather: ${weather.value}\nActivities:\n${activities.value}\n\nPlan:\n${fileContents.value}`;

  fs.writeFile(file, contents, function(err) {
    if (err) {
      return console.log(err);
    }
    alert(fileName.value + " travel plan was created");
    console.log("The travel plan file was created");
  });
});

btnRead.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting
  let file = path.join(pathName, fileName.value);

  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }

    // Use regular expressions or string manipulation to extract data for each field
    const destinationMatch = data.match(/Destination: (.+)/);
    const dateMatch = data.match(/Date: (.+)/);
    const notesMatch = data.match(/Notes:\n([\s\S]*?)\n\n/); // Matches multiline notes
    const weatherMatch = data.match(/Weather: (.+)/);
    const activitiesMatch = data.match(/Activities:\n([\s\S]*?)\n\n/); // Matches multiline activities
    const planMatch = data.match(/Plan:\n([\s\S]*)/); // Matches multiline plan contents

    // Set the values of each field if matched, otherwise leave empty
    destination.value = destinationMatch ? destinationMatch[1] : "";
    travelDate.value = dateMatch ? dateMatch[1] : "";
    notes.value = notesMatch ? notesMatch[1].trim() : "";
    weather.value = weatherMatch ? weatherMatch[1] : "";
    activities.value = activitiesMatch ? activitiesMatch[1].trim() : "";
    fileContents.value = planMatch ? planMatch[1].trim() : "";

    console.log("The travel plan file was read!");
  });
});



btnUpdate.addEventListener('click', function(event) {
  let file = path.join(pathName, fileName.value);
  let contents = `Destination: ${destination.value}\nDate: ${travelDate.value}\n\nNotes:\n${notes.value}\n\nWeather: ${weather.value}\nActivities:\n${activities.value}\n\nPlan:\n${fileContents.value}`;

  fs.writeFile(file, contents, function(err) {
    if (err) {
      return console.log(err);
    }
    alert(fileName.value + " travel plan was updated");
    console.log("The travel plan file was updated");
  });
});


btnDelete.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting
  let file = path.join(pathName, fileName.value);

  fs.unlink(file, function(err) {
    if (err) {
      return console.log(err);
    }
    fileName.value = "";
    fileContents.value = "";
    destination.value = "";
    travelDate.value = "";
    notes.value = "";
    weather.value = "";     // Clear the weather field
    activities.value = "";  // Clear the activities field
    console.log("The travel plan file was deleted!");
  });
});


