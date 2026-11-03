---
code: false
type: page
title: TypeScript
order: 300
description: The types of the OpenSearch 3 storage driver
---

# TypeScript

The package is written in TypeScript and ships its declarations.

## What it exports

| Export                                               | What it is                                                                                                                        |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `OpenSearch3Driver` (also the `default` export)      | The driver class, implementing Kuzzle's `StorageDriver` contract. Kuzzle builds one instance per storage scope (public, private). |
| `OpenSearch3Driver.createNativeClient(clientConfig)` | Builds a new `Client` of `@opensearch-project/opensearch` 3.9.0.                                                                  |

You do not instantiate the driver yourself: Kuzzle does, at startup. Its `manifest.json` declares the Kuzzle versions
it supports and its capabilities (see [Compatibility](/drivers/storage-opensearch-3/1/compatibility)).

## A typed native client

`app.storage.storageClient`, `app.storage.StorageClient` and the plugins' `context.constructors.ESClient` give the
driver's own client, built by `createNativeClient`. Kuzzle types them `any`, since the client depends on the driver.
To get the OpenSearch client's types, take them from the driver:

```ts
import type { OpenSearch3Driver } from "kuzzle-storage-opensearch-3";

type StorageClient = ReturnType<typeof OpenSearch3Driver.createNativeClient>;

const client = app.storage.storageClient as StorageClient;
const { body } = await client.count({ index: "@&nyc-open-data.yellow-taxi" });
```

A type-only import loads nothing at runtime. The OpenSearch client answers `{ body, statusCode, headers }`, as the
Elasticsearch 7 client did: the result is in `body`.

::: warning
Indices are named after Kuzzle's index and collection names (`&<index>.<collection>` for the public scope, behind an
alias `@&<index>.<collection>`). Query the native client only for what the Kuzzle API does not offer, and never write
through it to Kuzzle's internal index.
:::

## Configuration type

Kuzzle exports the type of `services.storageEngine`:

```ts
import type { StorageEngineElasticsearch } from "kuzzle";
```
