setCookie('id', new Date().getTime());

let currentID = getCookie('id');

const queryString = window.location.search,
  urlParams = new URLSearchParams(queryString),
  keys = urlParams.keys(),
  values = urlParams.values(),
  entries = urlParams.entries();
let nameID = 0;

for (const key of keys) console.log(key);
// product, color, newuser, size

for (const value of values) console.log(value);
// shirt, blue, , m

for (const entry of entries) {
  if (entry[0] == 'id') {
    nameID = entry[1];
  }
  console.log(`${entry[0]}: ${entry[1]}`);
}

function build(page, title) {
  Object.entries(page).forEach((layoutItem) => {
    if (!isDev) {
      if (!layoutItem[1]['pro'].disabled) {
        addElement(
          layoutItem[0],
          layoutItem[1].name,
          layoutItem[1].pro.css.use,
          layoutItem[1].pro.css.inline,
          layoutItem[1].pro.css.position,
          layoutItem[1].pro.js.use,
          layoutItem[1].pro.js.inline,
          layoutItem[1].pro.js.position,
          layoutItem[1].pro.version,
          layoutItem[1].pro.disabled,
          layoutItem[1].pro.tracking,
          title
        );
      }
    }
    if (isDev) {
      if (!layoutItem[1]['dev'].disabled) {
        addElement(
          layoutItem[0],
          layoutItem[1].name,
          layoutItem[1].dev.css.use,
          layoutItem[1].dev.css.inline,
          layoutItem[1].dev.css.position,
          layoutItem[1].dev.js.use,
          layoutItem[1].dev.js.inline,
          layoutItem[1].dev.js.position,
          layoutItem[1].dev.version,
          layoutItem[1].dev.disabled,
          layoutItem[1].dev.tracking,
          title
        );
      }
      document.getElementsByTagName('body')[0].style =
        'border-top: 5px solid red;';
    }
  });
}

function addElement(
  id,
  name,
  cssUse,
  cssInline,
  cssPosition,
  jsUse,
  jsInline,
  jsPosition,
  version,
  disabled,
  tracking,
  section
) {
  var elemDiv = document.createElement('div');
  elemDiv.setAttribute('id', id);
  elemDiv.setAttribute('name', name);
  elemDiv.setAttribute('css-use', cssUse);
  elemDiv.setAttribute('css-inline', cssInline);
  elemDiv.setAttribute('css-position', cssPosition);
  elemDiv.setAttribute('js-use', jsUse);
  elemDiv.setAttribute('js-inline', jsInline);
  elemDiv.setAttribute('js-position', jsPosition);
  elemDiv.setAttribute('disabled', disabled);
  elemDiv.setAttribute('version', version);
  elemDiv.setAttribute('section', section);
  elemDiv.setAttribute('version', tracking);
  document.body.appendChild(elemDiv);

  var file = 'components/' + name + '/' + version + '/index.html';

  xhttpHTML = new XMLHttpRequest();

  xhttpHTML.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        elemDiv.innerHTML = this.responseText;
      }
      if (this.status == 404) {
        elemDiv.innerHTML = 'Page not found ==> ' + file;
      }
    }
  };

  if (cssUse) {
    if (cssInline) {
      inlineCSS(name, version, cssPosition);
    } else {
      loadCssFile(name, version, cssPosition);
    }
  }

  xhttpHTML.open('GET', file, true);
  xhttpHTML.send();

  if (jsUse) {
    if (jsInline) {
      inlineJS(name, version, jsPosition);
    } else {
      loadJsFile(name, version, jsPosition);
    }
  }

  if (tracking) {
    loadTracker(name, version);
  }

  if (!isDev) {
    elemDiv.removeAttribute('name');
    elemDiv.removeAttribute('css-use');
    elemDiv.removeAttribute('css-inline');
    elemDiv.removeAttribute('css-position');
    elemDiv.removeAttribute('js-use');
    elemDiv.removeAttribute('js-inline');
    elemDiv.removeAttribute('js-position');
    elemDiv.removeAttribute('disabled');
    elemDiv.removeAttribute('version');
    elemDiv.removeAttribute('section');
    elemDiv.removeAttribute('tracking');
  }
}

function loadTracker(filename, version) {
  var jsFile = document.createElement('script');
  jsFile.setAttribute('name', filename + '-tracker');
  jsFile.setAttribute('type', 'text/javascript');
  jsFile.setAttribute(
    'src',
    'components/' + filename + '/' + version + '/tracker.js'
  );
  document.getElementsByTagName('Body').item(0).appendChild(jsFile);
}

function loadJsFile(filename, version, position) {
  var jsFile = document.createElement('script');
  jsFile.setAttribute('name', filename);
  jsFile.setAttribute('type', 'text/javascript');
  jsFile.setAttribute(
    'src',
    'components/' + filename + '/' + version + '/script.js'
  );
  if (position == 'body') {
    document.getElementsByTagName('Body').item(0).appendChild(jsFile);
  }
  if (position == 'head') {
    document.getElementsByTagName('head')[0].appendChild(jsFile);
  }
}

function loadCssFile(filename, version, position) {
  var cssFile = document.createElement('link');
  cssFile.setAttribute('name', filename);
  cssFile.setAttribute('type', 'text/css');
  cssFile.setAttribute('rel', 'stylesheet');
  cssFile.setAttribute('type', 'text/css');
  cssFile.setAttribute(
    'href',
    'components/' + filename + '/' + version + '/style.css'
  );
  if (position == 'body') {
    document.getElementsByTagName('body').item(0).appendChild(cssFile);
  }
  if (position == 'head') {
    document.getElementsByTagName('head')[0].appendChild(cssFile);
  }
}

function inlineJS(name, version, position) {
  var jsInline = document.createElement('script');
  jsInline.setAttribute('name', name);
  jsInline.setAttribute('type', 'text/javascript');
  var jsInlineFile = 'components/' + name + '/' + version + '/script.js';
  xhttpJS = new XMLHttpRequest();
  xhttpJS.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        jsInline.innerHTML = this.responseText;
        if (position == 'body') {
          document.getElementsByTagName('body').item(0).appendChild(jsInline);
        }
        if (position == 'head') {
          document.getElementsByTagName('head')[0].appendChild(jsInline);
        }
      }
      if (this.status == 404) {
        console.error('script not found ==> ' + jsInlineFile);
      }
    }
  };
  xhttpJS.open('GET', jsInlineFile, true);
  xhttpJS.send();
}

function inlineCSS(name, version, position) {
  var cssInline = document.createElement('style');
  cssInline.setAttribute('name', name);
  cssInline.setAttribute('type', 'text/css');
  var cssInlineFile = 'components/' + name + '/' + version + '/style.css';
  xhttpCSS = new XMLHttpRequest();
  xhttpCSS.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        cssInline.innerHTML = this.responseText;
        if (position == 'body') {
          document.getElementsByTagName('body').item(0).appendChild(cssInline);
        }
        if (position == 'head') {
          document.getElementsByTagName('head')[0].appendChild(cssInline);
        }
      }
      if (this.status == 404) {
        console.error('style not found ==> ' + cssInlineFile);
      }
    }
  };
  xhttpCSS.open('GET', cssInlineFile, true);
  xhttpCSS.send();
}

function removeBuildTags() {
  if (!isDev) {
    document.getElementById('build-header').remove();
    document.getElementById('build-content').remove();
    document.getElementById('build-footer').remove();
    document.getElementById('remover').remove();
    document.getElementById('config').remove();
    document.getElementById('layout').remove();
    document.getElementById('core').remove();
  }
}

function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
