## Overview

The background for this project was to create a purely javascript "hot-swappable" system for creating a web site, on a granular component level basis.

## Core files

1. config.js, this controls the overall configuration options for the project.

2. layout.js, this controls the elements used on each page, along with the version to be used in which mode (production or development).

3. core.js is the main driver file for the project and is responsible for actually building the pages based on the config and layout.

4. core.css is the global css file, for styles that are not component specific.

## Config file

The config file is used to store the project configs, the only default one is **_isDev_**, this determines if the system builds the development or production versions for delivery to the user. You should ensure that the config file is in .gitignore and the server version is always set to **_false_**. Local versions, can be switched back and forth between development and production modes, by changing the state of **_isDev_**

```
let isDev = false; // For Production mode
```

or

```
let isDev = true; // For Development mode
```

When set to **_false_** (production mode) the system will build the pages based on the **_pro_** settings in the layout file. When set to **_false_**, there are several other tasks that are available, such as attribute cleansing and tag removal - More on this in the html page description.

When set to **_true_** (development mode) the system will build the pages based on the **_dev_** settings in the layout file and will also not invoke the attribute cleansing and tag removal features. It will also display a red border at the top of the page to visually show that it's in **_dev_** mode.

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

## The page files

The page files are a simple copy and paste operation, with the exception that the specific page content objects from the layout file are included. Only the calls to the build function, with your content objects, need to change, the rest of the page stays exactly how it is.

### Example

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Index</title>
        <link rel="stylesheet" href="core/core.css">
        <script id="config" src="core/config.js"></script>
        <script id="layout" src="core/layout.js"></script>
        <script id="core" src="core/core.js"></script>
    </head>
    <body>
        <script id="build">
            // Start of your content
            build(header,'header');
            build(home,'home');
            build(footer,'footer');
            // End of your content
            removeBuildTags();
        </script>
    </body>
</html>

```

We can see that this is using the 'header', 'home' and 'footer' objects from the layout file to construct the page.

You can also see the **_removeBuildTags()_** function call, that cleanses the output file to remove the construction code:

```
  <script id="config" src="core/config.js"></script>
  <script id="layout" src="core/layout.js"></script>
  <script id="core" src="core/core.js"></script>
```

and

```
  <script id="build">
    build(header,'header');
    build(home,'home');
    build(footer,'footer');
    removeBuildTags();
  </script>
```

## Helpful notes

1. When in dev mode, a red border appears at the top of the page, to remind you that you are in dev mode.
2. When in dev mode, the elements tab in Dev Tools wil show you the data that is being used to build the element, useful for de-bugging.
3. The config file should be in GIT ignore, so that you don't update the MAIN config with local settings.

## Next Steps

1. Build a routing system
2. Look at changing to FETCH, from XMLHttpRequest for build
3. Add dynamic functionality with FETCH
