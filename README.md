# PostCSS Banks DB [![Build Status][ci-img]][ci]

[PostCSS] plugin to insert CSS based on Banks DB data.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ramoona/postcss-banks-db.svg
[ci]:      https://travis-ci.org/ramoona/postcss-banks-db

```css
@banks-db-template {
    .billing-form.is-COUNTRY-NAME {
        background-color: COLOR;
    }
}
```

```css
.billing-form.is-ru-alfabank {
    background-color: #F22F17;
}
.billing-form.is-be-inbelgium {
    background-color: #ff6600;
}
.billing-form.is-ru-citybank {
    background-color: #0088CF;
}
...
```

## Usage

```js
postcss([ require('postcss-banks-db') ])
```

See [PostCSS] docs for examples for your environment.
