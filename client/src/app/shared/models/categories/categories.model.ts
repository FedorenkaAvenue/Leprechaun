export interface CategoryI {
    id: number;
    url: string;
    title: string;
    is_public: boolean,
    icon: string | null;
    property_groups: Array<any>;
    products: Array<string>
}
