import { Property } from "@shared/models/Property";

interface Props {
    properties: Property[]
}

const Properties = ({ properties }: Props) => {
    return (
        <ul className="min-w-96">
            {properties.map(p => <li>prop</li>)}
        </ul>
    );
};

export default Properties;
