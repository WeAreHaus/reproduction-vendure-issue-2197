const fetch = require("node-fetch");

async function main() {
    const total = {}
    const skip = 5
    const take = 5
    const firstFetch = await getData(0, take)
    total[0] = firstFetch.data.search.items.map(item => item.productId)    
    const totalItems = firstFetch.data.search.totalItems
    const pages = Math.ceil(totalItems / take)

    for (let i = 1; i < pages; i++) {
        const data = await getData(i * skip, take)
        total[i] = data.data.search.items.map(item => item.productId)       
    }

    const flat = Object.keys(total).flatMap(k => total[k])
    const unique = [...new Set(flat)]

    console.log(`Product ids: ${flat.length}`)
    console.log(`Unique product ids: ${unique.length}`)
}

async function getData(skip, take) {
    const res = await fetch("http://localhost:3000/shop-api?languageCode=en", {
        "headers": {
          "accept": "*/*",          
          "content-type": "application/json",                    
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        // "body": `{\"operationName\":\"search\",\"variables\":{\"input\":{\"facetValueFilters\":[{\"or\":[]}],\"groupByProduct\":false,\"sort\":{\"name\":\"ASC\"},\"take\":${take},\"skip\":${skip}}},\"query\":\"query search($input: SearchInput!) {\\n  search(input: $input) {\\n    totalItems\\n    items {\\n      ...ListedProduct\\n      __typename\\n    }\\n    facetValues {\\n      facetValue {\\n        id\\n        name\\n        facet {\\n          id\\n          name\\n          __typename\\n        }\\n        __typename\\n      }\\n      count\\n      __typename\\n    }\\n    collections {\\n      collection {\\n        ...ListedCollection\\n        __typename\\n      }\\n      count\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ListedProduct on SearchResult {\\n  sku\\n  productId\\n  productVariantId\\n  productName\\n  slug\\n  description\\n  score\\n  inStock\\n  productAsset {\\n    id\\n    preview\\n    __typename\\n  }\\n  currencyCode\\n  price {\\n    ... on PriceRange {\\n      min\\n      max\\n      __typename\\n    }\\n    ... on SinglePrice {\\n      value\\n      __typename\\n    }\\n    __typename\\n  }\\n  priceWithTax {\\n    ... on PriceRange {\\n      min\\n      max\\n      __typename\\n    }\\n    ... on SinglePrice {\\n      value\\n      __typename\\n    }\\n    __typename\\n  }\\n  facetIds\\n  facetValueIds\\n  collectionIds\\n  __typename\\n}\\n\\nfragment ListedCollection on Collection {\\n  id\\n  name\\n  slug\\n  parentId\\n  featuredAsset {\\n    id\\n    preview\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`,
        "body": `{\"operationName\":\"search\",\"variables\":{\"input\":{\"take\":${take},\"skip\":${skip}}},\"query\":\"query search($input: SearchInput!) {\\n  search(input: $input) {\\n    totalItems\\n    items {\\n      ...ListedProduct\\n      __typename\\n    }\\n    facetValues {\\n      facetValue {\\n        id\\n        name\\n        facet {\\n          id\\n          name\\n          __typename\\n        }\\n        __typename\\n      }\\n      count\\n      __typename\\n    }\\n    collections {\\n      collection {\\n        ...ListedCollection\\n        __typename\\n      }\\n      count\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ListedProduct on SearchResult {\\n  sku\\n  productId\\n  productVariantId\\n  productName\\n  slug\\n  description\\n  score\\n  inStock\\n  productAsset {\\n    id\\n    preview\\n    __typename\\n  }\\n  currencyCode\\n  price {\\n    ... on PriceRange {\\n      min\\n      max\\n      __typename\\n    }\\n    ... on SinglePrice {\\n      value\\n      __typename\\n    }\\n    __typename\\n  }\\n  priceWithTax {\\n    ... on PriceRange {\\n      min\\n      max\\n      __typename\\n    }\\n    ... on SinglePrice {\\n      value\\n      __typename\\n    }\\n    __typename\\n  }\\n  facetIds\\n  facetValueIds\\n  collectionIds\\n  __typename\\n}\\n\\nfragment ListedCollection on Collection {\\n  id\\n  name\\n  slug\\n  parentId\\n  featuredAsset {\\n    id\\n    preview\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`,
        "method": "POST"
      });

    return await res.json()
}

main()