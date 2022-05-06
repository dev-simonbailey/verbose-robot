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
  }
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
    var buildScript = document.getElementById('build');
    buildScript.remove();
    var configScript = document.getElementById('config');
    configScript.remove();
    var layoutScript = document.getElementById('layout');
    layoutScript.remove();
    var coreScript = document.getElementById('core');
    coreScript.remove();
  }
}
