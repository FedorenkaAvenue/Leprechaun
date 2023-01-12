export class PropertiesGroupDto {
  id: number;
  title: string;
  alt_name: string;
  comment: string;
  properties: Array<PropertyDto>;
  is_primary: boolean;
}

export class PropertiesGroupPayload {
  title: string;
  alt_name: string;
  is_primary: boolean;
  comment: string;
}

export class PropertyDto {
  id: number;
  title: string;
  alt_name: string;
  comment: string;
  property_group: string;
}
