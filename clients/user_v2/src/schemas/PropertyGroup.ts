import PropertySchema from './Property';

export default interface PropertyGroupSchema {
    id: number;
    title: string;
    alt_name: string;
    properties?: PropertySchema[] | null;
}
