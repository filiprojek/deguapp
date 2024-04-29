import path from "path";
import { Env } from "nork";
const env = Env.get(path.join(__dirname, "../.env"));
export default env;
