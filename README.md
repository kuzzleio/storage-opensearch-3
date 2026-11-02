# kuzzle-storage-opensearch-3

The OpenSearch 3 storage driver for [Kuzzle](https://github.com/kuzzleio/kuzzle) 2.

`kuzzle-storage-opensearch-3` is the OpenSearch 3 storage driver of [Kuzzle](https://github.com/kuzzleio/kuzzle) 2. It is Kuzzle's Elasticsearch 7 driver on the OpenSearch 3 client (`@opensearch-project/opensearch` 3.9.0): same mappings, same queries, same errors. Kuzzle 2 does not ship it: you install it next to Kuzzle.

📖 Full documentation: https://docs.kuzzle.io/drivers/storage-opensearch-3/1/

## Install

Install the package in your application, next to `kuzzle`:

```bash
npm install kuzzle-storage-opensearch-3
```

Then select it in your `.kuzzlerc`, with the address of your OpenSearch 3 cluster:

```jsonc
{
  "services": {
    "storageEngine": {
      "driver": "kuzzle-storage-opensearch-3",
      "client": { "node": "http://localhost:9200" }
    }
  }
}
```

`majorVersion` is not read when `driver` is set, and Kuzzle logs a warning if both are set: remove `majorVersion`.
The same works with the `kuzzle_services__storageEngine__driver` environment variable.

The rest of `services.storageEngine` (`client`, `commonMapping`, `defaultSettings`, `internalIndex`...) works as
with Elasticsearch: see [Configuration](https://docs.kuzzle.io/drivers/storage-opensearch-3/1/configuration/).

## Requirements

- Kuzzle 2.61 or later, within Kuzzle 2
- OpenSearch 3.x (tested on 3.0.0 and 3.9.0)
- Node.js 22.12 or later

Every node of a Kuzzle cluster must run the same driver, in the same version.

## TypeScript

The package ships its declarations. It exports the driver class, `OpenSearch3Driver` (also its default export), whose static
`createNativeClient()` builds an `@opensearch-project/opensearch` 3.9.0 `Client`. To type the native client Kuzzle
gives your application:

```ts
import type { OpenSearch3Driver } from "kuzzle-storage-opensearch-3";

type StorageClient = ReturnType<typeof OpenSearch3Driver.createNativeClient>;

const client = app.storage.storageClient as StorageClient;
```

See [TypeScript](https://docs.kuzzle.io/drivers/storage-opensearch-3/1/typescript/).

## Capabilities

The driver declares every optional capability (`aggregations`, `mappingUpdates`, `stats`, `updateByQuery`): every
Kuzzle API action works.

## Development

```bash
npm ci
npm run test:unit   # the unit suite, no OpenSearch needed

docker run -d -p 9200:9200 -e discovery.type=single-node -e DISABLE_SECURITY_PLUGIN=true opensearchproject/opensearch:3.9.0
npm test            # the unit suite and Kuzzle's conformance kit, against OPENSEARCH_NODE (default http://localhost:9200)
```

`npm run lint`, `npm run typecheck` and `npm run build` complete the checks the CI runs. The unit suite is the one of
[storage-es-7](https://github.com/kuzzleio/storage-es-7), the driver this one is built from: only
`test/unit/elasticsearch.test.ts` and `test/unit/esWrapper.test.ts` name their driver.

To write a driver for another engine, see
[Write a storage driver](https://docs.kuzzle.io/core/2/guides/write-storage-drivers/).

## Release

Releases are made by semantic-release: `beta` publishes prereleases on the `beta` npm tag, `master` publishes stable
versions. The documentation is in `doc/1/`.

## License

[Apache-2.0](LICENSE.md)
