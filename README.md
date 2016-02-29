# PostCSS Banks DB [![Build Status][ci-img]][ci]

[PostCSS] plugin to insert CSS based on [Banks DB] data.

[PostCSS]: https://github.com/postcss/postcss
[Banks DB]: https://github.com/ramoona/banks-db
[ci-img]:  https://travis-ci.org/ramoona/postcss-banks-db.svg
[ci]:      https://travis-ci.org/ramoona/postcss-banks-db

```css
@banks-db-template {
    .billing-form.is-%code% {
        background-color: %color%;
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

## Best Practices

*  Banks have different colors so you must use [postcss-contrast](https://github.com/stephenway/postcss-contrast) to be sure about form readability. Put it after `postcss-banks-db`.

    ```css
    @banks-db-template {
        .billing-form.is-%code% {
            background-color: %color%;
            color: contrast(%color%);
        }
    }
    ```

*  Add long transition for form colors because quick changes scary users.

    ```css
    .billing-form.is-%code% {
        transition: background .6s, color .6s;
    }
    ```

## Usage

```js
postcss([ require('postcss-banks-db') ])
```

See [PostCSS] docs for examples for your environment.
