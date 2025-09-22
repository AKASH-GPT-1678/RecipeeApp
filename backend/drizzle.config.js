import {ENV} from "./configs/env.js"


export default {
    schema : "./models/schema.js",
    out : "./models/migrations",
    dialect : "postgresql",
    dbCredentials : {url : ENV.DATABASE_URL},
}