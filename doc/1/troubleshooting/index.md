---
code: false
type: page
title: Troubleshooting
order: 500
description: Diagnose the OpenSearch 3 storage driver
---

# Troubleshooting

## Kuzzle does not start

| Error                                                                               | Cause                                                                                | Fix                                                                                                                        |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| [services.storage_driver.not_found](/core/2/api/errors/error-codes/services)        | `driver` names a package Kuzzle cannot find from the application's directory.        | Install `kuzzle-storage-opensearch-3` in the application that starts Kuzzle, and check the spelling.                       |
| [services.storage_driver.version_mismatch](/core/2/api/errors/error-codes/services) | This Kuzzle version is out of the driver's `kuzzleVersion` range.                    | Upgrade Kuzzle, or install a driver version that supports yours.                                                           |
| [services.storage_driver.invalid_manifest](/core/2/api/errors/error-codes/services) | The package's `manifest.json` is missing or broken.                                  | Reinstall the package.                                                                                                     |
| [services.storage.version_mismatch](/core/2/api/errors/error-codes/services)        | The cluster is not OpenSearch, or its version is older than 3.0.0 or newer than 3.x. | Point `client.node` at an OpenSearch 3 cluster, or use the OpenSearch 2 driver for OpenSearch 2.19 and later 2.x versions. |
| [cluster.join.storage_driver_mismatch](/core/2/api/errors/error-codes/cluster)      | Another node of the cluster runs another driver, or another version of it.           | Deploy the same `package-lock.json` on every node.                                                                         |

## Kuzzle cannot reach OpenSearch

Kuzzle waits for the cluster at startup, and gives up after `services.storageEngine.initTimeout` (or
`services.common.defaultInitTimeout`, 2 minutes by default). While it waits, the driver logs why the cluster does not
answer yet, as a warning (`[⚠] OpenSearch is not reachable yet: <reason>`). It does not wait for what waiting cannot
fix: a TLS failure (untrusted or expired certificate, host name missing from the certificate) or credentials the cluster
refuses (401, 403) stop the startup at once, with a
[services.storage.unexpected_error](/core/2/api/errors/error-codes/services) error naming the cause. Check `client.node`
from the machine running Kuzzle (`curl <node>/_cluster/health`), and the authentication and TLS (`ssl`) options of
`client`. Once started, a request reaching a disconnected cluster gets a
[services.storage.not_connected](/core/2/api/errors/error-codes/services) error.

## Errors returned by the API

The driver turns OpenSearch errors into Kuzzle's [storage errors](/core/2/api/errors/error-codes/services)
(`services.storage.*`): a client gets the same error whatever the engine. To see the OpenSearch error behind one,
start Kuzzle with `DEBUG=kuzzle:services:storage:opensearch3`.
