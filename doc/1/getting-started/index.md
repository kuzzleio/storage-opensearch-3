---
code: false
type: page
title: Getting started
order: 100
description: Install and select the OpenSearch 3 storage driver
---

# Getting started

`kuzzle-storage-opensearch-3` is the OpenSearch 3 storage driver of [Kuzzle](https://github.com/kuzzleio/kuzzle) 2. It is Kuzzle's Elasticsearch 7 driver on the OpenSearch 3 client (`@opensearch-project/opensearch` 3.9.0): same mappings, same queries, same errors. Kuzzle 2 does not ship it: you install it next to Kuzzle.

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
      "client": { "node": "http://localhost:9200" },
    },
  },
}
```

`majorVersion` is not read when `driver` is set, and Kuzzle logs a warning if both are set: remove `majorVersion`.
The same works with the `kuzzle_services__storageEngine__driver` environment variable.

## Check

At startup, Kuzzle logs the driver it runs:

```
[ℹ] Storage driver: kuzzle-storage-opensearch-3@<version>
```

The rest of `services.storageEngine` is described in [Configuration](/drivers/storage-opensearch-3/1/configuration).
