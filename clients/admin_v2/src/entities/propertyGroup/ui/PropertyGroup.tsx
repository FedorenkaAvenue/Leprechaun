import PropertyGroupModel from "../model/PropertyGroup";

interface Props {
    group: PropertyGroupModel | undefined
}

const PropertyGroup = ({ group }: Props) => {
    return (
        <div>
            <div>id: <b>{group?.id}</b></div>
            <div>alt name: <b>{group?.alt_name}</b></div>
            <div>
                title
                <ul>
                    <li>en: <b>{group?.title.en}</b></li>
                    <li>ru: <b>{group?.title.ru}</b></li>
                    <li>ua: <b>{group?.title.ua}</b></li>
                </ul>
            </div>
            <div>is primary: <b>{group?.is_primary ? 'yes' : 'no'}</b></div>
        </div>
    );
};

export default PropertyGroup;
