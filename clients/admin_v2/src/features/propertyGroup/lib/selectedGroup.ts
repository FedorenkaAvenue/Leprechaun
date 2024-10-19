import { createContext } from "react";

import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";

const SelectedGroupContext = createContext<PropertyGroupModel['id'] | null>(null);

export default SelectedGroupContext;
