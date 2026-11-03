/*
 * The OpenSearch versions this driver runs on, checked at startup against
 * what the cluster's root endpoint answers.
 */

import semver from "semver";

/** The OpenSearch versions this driver runs on */
export const SUPPORTED_OPENSEARCH_VERSIONS = ">=3.0.0 <4.0.0";

/**
 * True when the cluster is an OpenSearch one of a supported version.
 * Elasticsearch answers the same endpoint, with another `distribution`
 * (or none): it is refused, as is a version out of range.
 */
export function isSupportedOpenSearch(version: {
  distribution?: string;
  number: string;
}): boolean {
  const coerced = semver.coerce(version.number);

  return (
    version.distribution === "opensearch" &&
    coerced !== null &&
    semver.satisfies(coerced, SUPPORTED_OPENSEARCH_VERSIONS)
  );
}
