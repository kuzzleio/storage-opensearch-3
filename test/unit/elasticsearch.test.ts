import { vi } from "vitest";

import { OpenSearch3Driver } from "../../lib";
import { describeElasticsearch } from "./elasticsearchCases";

vi.mock("kuzzle", async (importOriginal) => {
  const { withLock } = await import("./elasticsearchCases/lockFixture");

  return { ...(await importOriginal<typeof import("kuzzle")>()), withLock };
});

// The OpenSearch client answers in the Elasticsearch 7 client's envelope.
describeElasticsearch("7", OpenSearch3Driver);
