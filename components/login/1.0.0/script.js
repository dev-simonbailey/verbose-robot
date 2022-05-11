var countDownDate = new Date('June 1, 2022 00:00:00').getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in an element with id="demo"
  document.getElementById('login-coming-soon').innerHTML =
    days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('login-coming-soon').innerHTML = 'EXPIRED';
  }
}, 1000);

if (nameID) {
  getName(nameID);
} else {
  getNames();
}

// SQLITE FUNCTIONS
function getNames() {
  namesDiv = document.getElementById('namesList');
  let namesList = '<ul>';
  var request = new XMLHttpRequest();

  request.open(
    'GET',
    'http://localhost:8888/github/verbose-robot/api/getNames.php',
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach((item) => {
        namesList += '<li>' + item.name + '</li>';
      });
      namesList += '</ul>';
      namesDiv.innerHTML = namesList += '</ul>';
    } else {
      namesDiv.innerHTML = 'DATA ERROR';
    }
  };

  request.send();
}

function getName(id) {
  namesDiv = document.getElementById('namesList');
  let namesList = '<ul>';
  var request = new XMLHttpRequest();

  request.open(
    'GET',
    'http://localhost:8888/github/verbose-robot/api/getName.php?id=' + id,
    true
  );
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);

    console.info(request.status);

    if (request.status == 200) {
      data.forEach((item) => {
        namesList += '<li>' + item.name + '</li>';
      });
      namesList += '</ul>';
      namesDiv.innerHTML = namesList += '</ul>';
    }
    if (request.status == 400) {
      namesDiv.innerHTML = data.Error;
    }
  };

  request.send();
}
