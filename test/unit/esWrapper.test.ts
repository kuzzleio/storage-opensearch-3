import { errors } from "@opensearch-project/opensearch";

import ESWrapper from "../../lib/esWrapper";
import { describeESWrapper } from "./esWrapperCases";

describeESWrapper("7", ESWrapper as never, errors.ResponseError as never);
