## Overview

The background for this project was to create a purely javascript "hot-swappable" system for creating web site, on a granular component level basis.

## Core files

1. config.js, this controls the overall configuration options for the project.

2. layout.js, that controls the elements used on each page, along with the version to be used in which mode (production or development).

3. core.js is the main driver file for the project and is responsible for actually building the pages based on the config and layout

4. core.css is the global css file, for style that are not component specific.

## Config file

The config file is used to store the project configs, the only default one is **_displayMode_**

```
let displayMode = 'production';
```

or

```
let displayMode = 'development';
```

When set to **_production_**, the system will build the pages based on the **_pro_** settings in the layout file. When to **_production_**, there are several other tasks that are available, such as attribute cleansing and tag removal - More on this in the html page description.

In **_development_** mode, the system will build the pages based on the **_dev_** settings in the layout file and will also not invoke the attribute cleansing and tag removal features. It will also display a red border at the top of the page to visually show that it's in **_dev_** mode.

## Layout file

The layout file is used to describe what components are used on which pages and which versions of the component to use in which mode.

### The construction of the layout file is:

```
const header = {...
};
const home = {...
}
const about = {...
}
```

where each of the objects contain the component details, described below

### The construction of the component in the layout file is:

```
  id: {
    name: 'name of the item',
    pro: {
      css: {
        use: true || false,
        inline: true || false || null,
        position: 'head' || 'body' || null,
      },
      js: {
        use: true || false,
        inline: true || false || null,
        position: 'head' || 'body' || null,
      },
      version: 'integer.integer.integer',
      disabled: true || false,
    },
    dev: {
      css: {
        use: true || false,
        inline: true || false || null,
        position: true || false || null,
      },
      js: {
        use: true || false,
        inline: true || false || null,
        position: true || false || null,
      },
      version: 'integer.integer.integer',
      disabled: true || false,
    },
  },
```

### Example

```
  mainnav: {
    name: 'navigation',
    pro: {
      css: {
        use: true,
        inline: true,
        position: 'head',
      },
      js: {
        use: false,
        inline: null,
        position: null,
      },
      version: '1.0.0',
      disabled: false,
    },
    dev: {
      css: {
        use: true,
        inline: true,
        position: 'head',
      },
      js: {
        use: false,
        inline: null,
        position: null,
      },
      version: '2.0.0',
      disabled: false,
    },
  },
```

> **_id_** : id of the element, which must be unique!

> **_name_**: The name of the component and should be unique and identify the item - used as path to the elements root.

> **_pro_**: This section describes the production settings for the component.

> **_dev_**: This section describes the development settings for the component and can be different from the production settings

> **_css.use_**: If your element has a CSS dependency, then true, otherwise false.

> **_css.inline_**: If your elements **_css.use_** is set to true, you can opt to include it as an external link resource (false) or as an inline style element (true). If **_css.use_** is set to false, then **_css.inline_** should be set to **_null_**

> **_css.position_**: If your elements **_css.use_** is set to true, you can choose where you wish the link resource or inline style (**_css.inline_** value) to be placed in your page. 'head' wil place it in the `<head>`, whereas 'body' will place it at the base of the `<body>`. If **_css.use_** is set to false, then **_css.position_** should be set to **_null_**

> **_js.use_**: If your element has a JS dependency, then true, otherwise false. Pro and Dev can have differing dependencies.

> **_js.inline_**: If your elements **_js.use_** is set to true, you can opt to include it as an external script (false) or as an inline script (true). If **_js.use_** is set to false, then **_js.inline_** should be set to **_null_**

> **_js.position_**: If your elements **_js.use_** is set to true, you can choose where you wish the external script or inline script (**_js.inline_** value) to be placed in your page. 'head' wil place it in the `<head>`, whereas 'body' will place it at the base of the `<body>`. If **_js.use_** is set to false, then **_js.position_** should be set to **_null_**

> **_version_**: The version number that is being used for the respective mode. The versioning numbering system is up to you, but we would suggest a semantic system e.g '1.0.0' and your corresponding component version would be contained in a the path: **_components/component-name/version_** e.g **_components/navigation/1.0.0/_**

> **disabled**: Use this to switch on and off the element - values valid in both Production and Development modes

## Media

There is a global media directory in **_/media_**. It is suggested that all your media is placed in here, if local to the project, otherwise just reference the media in the components.
