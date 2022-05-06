Really must write something here that explains what this is!

The construction of the component in the layout file is:

```
  id: {
    name: '{dir name of the item}',
    pro: {
      css: '{true} or {false}',
      js: '{true} or {false}',
      version: '{integer.integer.integer}',
      disabled: '{true} or {false}',
    },
    dev: {
      css: '{true} or {false}',
      js: '{true} or {false}',
      version: '{integer.integer.integer}',
      disabled: '{true} or {false}',
    },
  },
```

Example

```
  mainnav: {
    name: 'navigation',
    pro: {
      css: 'true',
      js: 'false',
      version: '1.0.0',
      disabled: 'false',
    },
    dev: {
      css: 'true',
      js: 'false',
      version: '2.0.0',
      disabled: 'false',
    },
  },
```

> **_id_** : id of the element, which must be unique!

> **_name_**: The name of the component and should be unique and identify the item - used as path to the elements root.

> **_pro_**: This section describes the production settings for the component.

> **_pro_**: This section describes the development settings for the component.

> **_css_**: If your element has a CSS dependency, then true, otherwise false. Pro and Dev can have differing dependencies.

> **_js_**: If your element has a JS dependency, then true, otherwise false. Pro and Dev can have differing dependencies.

> **_version_**: The version number that is being used for the respective mode. The versioning numbering system is up to you, but we would suggest a semantic system e.g '1.0.0' and your corresponding component version would be contained in a the path: **_components/component-name/version_**

> **disabled**: Use this to switch on and off the element - values valid in both Production and Development modes

```

```
