# reproduction-vendure-issue-2197

This project was generated with [`@vendure/create`](https://github.com/vendure-ecommerce/vendure/tree/master/packages/create).

## How to reproduce

- `yarn install`
- `yarn dev`
- In the project root: `node test.js`

There are 32 products which are translated into both English and Swedish. `test.js` will query the shop API using `languageCode=en`. The default language is set to Swedish.

The resulting data will contain 64 products in total, one for each translation, even though it should only contain the products in English.