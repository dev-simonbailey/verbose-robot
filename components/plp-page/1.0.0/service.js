let plpHeader = document.getElementById('plp-header');
let listDiv = document.getElementById('product-list');

if (localStorage.getItem('search')) {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    'http://localhost:8888/github/verbose-robot/api/getName.php?s=' +
      localStorage.getItem('search'),
    true
  );
  request.onload = function () {
    var data = JSON.parse(this.response);
    console.log(request.status);
    if (request.status == 200 || request.status < 400) {
      data.forEach((item) => {
        plpHeader.innerText = item.name;
      });
    }
    if (request.status == 400) {
      plpHeader.innerText =
        'No records found for: ' + localStorage.getItem('search');
    }
  };
  request.send();
} else {
  plpHeader.innerText = 'No Search Terms Entered';
}

var request = new XMLHttpRequest();
request.open(
  'GET',
  'http://localhost:8888/github/verbose-robot/api/getNames.php',
  true
);
request.onload = function () {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach((item) => {
      var listContent = document.createElement('div');

      listContent.innerHTML = '<div>' + item.name + '</div>';
      listDiv.appendChild(listContent.firstChild);
    });
  } else {
    listDiv.innerHTML = 'DATA ERROR';
  }
};
request.send();
