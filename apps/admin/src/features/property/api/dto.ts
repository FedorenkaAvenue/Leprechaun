import { z } from "zod";

import { propertySchema } from "../models/schema";
import { PropertyGroup } from "@entities/propertyGroup/model/interfaces";

export type PropertyCreateDTO = z.infer<typeof propertySchema> & {
    propertyGroup: PropertyGroup['id']
}
