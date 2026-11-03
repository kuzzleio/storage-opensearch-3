---
code: false
type: page
title: Configuration
order: 200
description: Configure the OpenSearch 3 storage driver
---

# Configuration

Every key of `services.storageEngine` is handed to the driver, as it was to Kuzzle's embedded Elasticsearch code.
None is specific to this driver:

| Key                                | Default                                   | What it does                                                                                                           |
| ---------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `client`                           | `{ "node": "http://localhost:9200" }`     | The [OpenSearch client options](https://docs.opensearch.org/latest/clients/javascript/): nodes, authentication, TLS... |
| `commonMapping`                    | `_kuzzle_info` fields, `dynamic: "false"` | The mapping merged into every collection's mapping.                                                                    |
| `defaultSettings`                  | 1 shard, 1 replica                        | The settings of a new collection's index, unless the request sets them.                                                |
| `internalIndex`                    | `kuzzle`, with its collections            | The name, settings and mappings of Kuzzle's internal index.                                                            |
| `maxScrollDuration`                | `"1m"`                                    | The longest scroll a request may ask for.                                                                              |
| `defaults.onUpdateConflictRetries` | `0`                                       | How many times an update is retried on a version conflict.                                                             |
| `defaults.scrollTTL`               | `"15s"`                                   | How long a paginated search's cursor lives.                                                                            |
| `generateMissingAliases`           | `true`                                    | Creates the aliases of the collections that have none, at startup (data created before Kuzzle 2.14).                   |

The full reference, with comments, is Kuzzle's
[`.kuzzlerc.sample.jsonc`](https://github.com/kuzzleio/kuzzle/blob/master/.kuzzlerc.sample.jsonc). Each key can also
be set through an environment variable, for example `kuzzle_services__storageEngine__client__node`.

## Authentication and TLS

`client` goes to the OpenSearch client as it is. Note that the OpenSearch client names its TLS options `ssl`, where
the Elasticsearch 8 and 9 clients say `tls`:

```jsonc
{
  "services": {
    "storageEngine": {
      "driver": "kuzzle-storage-opensearch-3",
      "client": {
        "node": "https://opensearch.example.com:9200",
        "auth": { "username": "kuzzle", "password": "<password>" },
        "ssl": { "rejectUnauthorized": true },
      },
    },
  },
}
```

Keep secrets out of `.kuzzlerc`: use [Kuzzle's vault](/core/2/guides/advanced/secrets-vault) or environment variables.
