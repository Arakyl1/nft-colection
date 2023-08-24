# Nuxt Example

Deploy your [Nuxt](https://nuxt.com) project to Vercel with zero configuration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/vercel/tree/main/examples/nuxtjs&template=nuxtjs)

_Live Example: https://nuxtjs-template.vercel.app_

Look at the [Nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.


Documetation for Api

Find Attridute

Send a request to GET, in the parameters specify the name of the property you want to search for.  Example of search parameters, "{ id: 4, name: 'chert' }" or { name: 'chert' }. In this case, the value of the parameters will be compared in strict type, that is, the value of the parameter in the query and the value of the same parameter in the database must be equal. To perform a less rigorous search, you can specify optional parameters such as 'gt', 'in', 'lte', 'contains'. Optional parameters are specified together with the value, 'optional property' + ':' + 'value'. For example: "{id: 'gt:45' }". You can specify several optimal parameters per property, via ';', for example: "{id: 'gt:45;lt:56' }".

The 'search' key. Searches through all string fields of the element for the presence of a value. For example { search: 'cat' }

The 'limit' key. Specifies how many objects should be returned in the list. For example { limit: '12' }

The "page". Allows you to split the returned list into pages. Important!! To work correctly, you need to specify the "limit" parameter. Example "{ page: '2', limit: '12' }"

The "orderBy". Sorts the returned list by the specified fields. Specify the names of the fields to be sorted by + ':' + ('default' or 'insensitive'). Example "{ orderBy: 'name:insensitive;id:default' }"

The "include" key. Specifies which relationships should be loaded readily. It is required to specify the key a in the value, the names of the relations through ','. You can also configure the number of returned relationship elements, or other parameters (you will find a list of additional parameters at the bottom). Additional parameters are specified completely with '_' and through ';'I ask, we provide additional parameters and the value of statistics':' .Example " { include:' 'blogCard' }" or "{ include: 'blogCard,nftCardId'}" or "{ include: 'blogCard_s:2;t:4,nftCardId_t:5' }"

The "unique" key. Searches for an element with a unique 'id'. Important!! You also need to specify 'id' in the parameters. For example "{ unique: true, id: '45' }".

The "fullinfo" key. Allows you to return complete information about the element, including relationships. Works in conjunction with the key "unique". For example "{ unique: true, fullinfo: true, id: '45' }".

The following search fields are available for attributes: 'id', 'name'.

Full list of option parameters.

For Int property 
*'equals', Exmp. "{ id: 'equals:45' }"
*'not', Exmp. "{ id: 'not:45' }"
*'in', Exmp. "{ id: 'in:45' }" or "{ id: 'in:45,56,67' }" comma-separated indicates when multiple values need to be specified
*'notIn', Exmp. "{ id: 'notIn:45' }" or "{ id: 'notIn:45,56,67' }" comma-separated indicates when multiple values need to be specified
*'lt', Exmp. "{ id: 'lt:45' }"
*'lte', Exmp. "{ id: 'lte:45' }"
*'gt', Exmp. "{ id: 'gt:45' }"
*'gte', Exmp. "{ id: 'gte:45' }"

For String property 
*'equals', Exmp. "{ name: 'equals:cat' }"
*'not', Exmp. "{ name: 'not:cat' }"
*'in', Exmp. "{ name: 'in:cat' }" or "{ name: 'in:cat,dog' }" comma-separated indicates when multiple values need to be specified
*'notIn', Exmp. "{ name: 'notIn:cat' }" or "{ name: 'notIn:cat,dog' }" comma-separated indicates when multiple values need to be specified
*'lt', Exmp. "{ name: 'lt:cat' }"
*'lte', Exmp. "{ name: 'lte:cat' }"
*'gt', Exmp. "{ name: 'gt:cat' }"
*'gte', Exmp. "{ name: 'gte:cat' }"
*'endsWith', Exmp. "{ name: 'endsWith:cat' }"
*'startsWith', Exmp. "{ name: 'startsWith:cat' }"
*'contains', Exmp. "{ name: 'contains:cat' }"
*'mode', Case sensitive, has the following values: 'default','insensitive'. Exmp. "{ name: 'mode:insensitive' }"

For DateTime property 
*'equals', Exmp. "{ createAt: 'equals:Thu Aug 17 2023 00:33:24 GMT+0300' }"
*'not', Exmp. "{ createAt: 'not:Thu Aug 17 2023 00:33:24 GMT+0300' }"
*'in', Exmp. "{ createAt: 'in:Thu Aug 17 2023 00:33:24 GMT+0300' }" or "{ createAt: 'in:Thu Aug 17 2023 00:33:24 GMT+0300,1692221629651,169221629651' }" comma-separated indicates when multiple values need to be specified
*'notIn', Exmp. "{ createAt: 'notIn:Thu Aug 17 2023 00:33:24 GMT+0300' }" or "{ createAt: 'notIn:Thu Aug 17 2023 00:33:24 GMT+0300,1692221629651,169221629651' }" comma-separated indicates when multiple values need to be specified
*'lt', Exmp. "{ createAt: 'lt:Thu Aug 17 2023 00:33:24 GMT+0300' }"
*'lte', Exmp. "{ createAt: 'lte:Thu Aug 17 2023 00:33:24 GMT+0300' }"
*'gt', Exmp. "{ createAt: 'gt:Thu Aug 17 2023 00:33:24 GMT+0300' }"
*'gte', Exmp. "{ createAt: 'gte:Thu Aug 17 2023 00:33:24 GMT+0300' }"


