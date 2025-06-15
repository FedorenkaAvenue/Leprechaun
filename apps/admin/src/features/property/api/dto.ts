import { z } from "zod";

import { propertySchema } from "../models/schema";
import { PropertyGroup } from "@gen/property_group";

export type PropertyCreateDTO = z.infer<typeof propertySchema> & {
    propertyGroup: PropertyGroup['id']
}
