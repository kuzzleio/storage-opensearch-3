## [1.0.1](https://github.com/kuzzleio/storage-opensearch-3/compare/v1.0.0...v1.0.1) (2026-11-12)

### Bug Fixes

* report why the engine does not answer at startup, and fail on what waiting cannot fix ([f9a109e](https://github.com/kuzzleio/storage-opensearch-3/commit/f9a109e69f7480fe04059c5c87d4e404bd79eb06)), closes [kuzzleio/storage-es-8#9](https://github.com/kuzzleio/storage-es-8/issues/9)

## 1.0.0 (2026-11-03)

### Dependencies

* **deps:** drop bluebird ([9af032c](https://github.com/kuzzleio/storage-opensearch-3/commit/9af032cfe82a3bbb5950ad27aa822757a4ca17de))

### Features

* close the engine client on Kuzzle's shutdown ([496db15](https://github.com/kuzzleio/storage-opensearch-3/commit/496db15c2a366373008e46796026aa54a010b85b)), closes [kuzzleio/kuzzle#3141](https://github.com/kuzzleio/kuzzle/issues/3141)
* OpenSearch 3 storage driver ([6ae31bf](https://github.com/kuzzleio/storage-opensearch-3/commit/6ae31bf842c88b8b4805322f9c73cfce07a7b1c5))

### Bug Fixes

* keep lodash types out of the shipped declarations ([dea297a](https://github.com/kuzzleio/storage-opensearch-3/commit/dea297a864baab236902837a15252067e8bda7e5))
* map OpenSearch's actual error messages to storage errors ([6deca68](https://github.com/kuzzleio/storage-opensearch-3/commit/6deca681bb7542bfe3c355749d4b90506dfdc8b1))
* name OpenSearch in the driver's debug messages ([edd0ea4](https://github.com/kuzzleio/storage-opensearch-3/commit/edd0ea4581f898421caa4c2f6b2c0d868c853e19)), closes [kuzzleio/kuzzle#3143](https://github.com/kuzzleio/kuzzle/issues/3143)
* report "opensearch" as the engine family ([8e8a51f](https://github.com/kuzzleio/storage-opensearch-3/commit/8e8a51fd8e1aba33a28ddc83fa2c8e94cab89941)), closes [kuzzleio/kuzzle#3133](https://github.com/kuzzleio/kuzzle/issues/3133)
* say OpenSearch in the driver's logs ([21084a3](https://github.com/kuzzleio/storage-opensearch-3/commit/21084a3c9b07348b5223b13c8874ae10468a0793))
* send no document limit for a negative deleteByQuery size ([#1](https://github.com/kuzzleio/storage-opensearch-3/issues/1)) ([3fdc56d](https://github.com/kuzzleio/storage-opensearch-3/commit/3fdc56d613f456afad1d00ca41b15a48ad209cec)), closes [kuzzle#3125](https://github.com/kuzzleio/kuzzle/issues/3125)
