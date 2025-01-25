import { z } from "zod";

import propertyGroupSchema from "../models/schema";

export type PropertyGroupCreateDTO = z.infer<typeof propertyGroupSchema>
export type PropertyGroupUpdateDTO = Partial<PropertyGroupCreateDTO>
