import { Featured } from "../../../fastify";
import { Handler } from "./handler";
import { Schema } from "./schema";

export default Featured("hook.sse", Schema, Handler);
