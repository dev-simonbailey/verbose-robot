getNames();

if (localStorage.getItem('search')) {
  var request = new XMLHttpRequest();
  var plpHeader = document.getElementById('plp-header');
  request.open(
    'GET',
    'http://localhost:8888/github/verbose-robot/api/getName.php?id=' +
      localStorage.getItem('search'),
    true
  );
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status == 200) {
      data.forEach((item) => {
        plpHeader.innerText = item.name;
      });
    }
    if (request.status == 400) {
      plpHeader.innerText = data.Error;
    }
  };
  request.send();
}

function getNames() {
  let listDiv = document.getElementById('product-list');
  var listContent = '';
  //var listContent = '<div class="plp-header" id="plp-header"></div>';
  var request = new XMLHttpRequest();

  //var mydiv = document.getElementById("mydiv");
  //var newcontent = document.createElement('div');

  //newcontent.innerHTML = "bar";

  //while (newcontent.firstChild) {
  //  listDiv.appendChild(listContent.firstChild);
  //}

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
        listContent += '<div>' + item.name + '</div>';
      });
      //listDiv.innerHTML = listContent;
      listDiv.appendChild(listContent.firstChild);
    } else {
      //listDiv.innerHTML = 'DATA ERROR';
      listDiv.appendChild(listContent.firstChild);
    }
  };
  request.send();
}
