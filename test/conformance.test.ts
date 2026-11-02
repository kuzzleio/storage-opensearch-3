/* Kuzzle's conformance kit, against a real OpenSearch 3
 * (OPENSEARCH_NODE, http://localhost:9200 by default). */

import { describeStorageDriverConformance } from "kuzzle";
import type { StorageCapability } from "kuzzle";
import { afterAll, beforeAll, describe, it } from "vitest";

import { OpenSearch3Driver } from "../lib";
import manifest from "../manifest.json";

describeStorageDriverConformance({
  Driver: OpenSearch3Driver,
  capabilities: manifest.capabilities as StorageCapability[],
  config: {
    client: { node: process.env.OPENSEARCH_NODE ?? "http://localhost:9200" },
  },
  test: { afterAll, beforeAll, describe, it },
});
