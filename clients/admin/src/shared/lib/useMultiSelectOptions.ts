import { useMemo, useState } from "react";

// type lol = { [key: PropertyGroupPreviewModel['id']]: PropertyModel['id'][] };

export default function useMultiSelectOptions(initState = {}) {
    const [selectedValues, setSelectedValues] = useState(initState);
    const values = useMemo(() => Object.values(selectedValues).flat(), [selectedValues]);

    function handleUpdataValues(parent: any, values: any) {
        setSelectedValues({ ...selectedValues, [parent]: values });
    }

    function clear() {
        setSelectedValues({});
    }

    return { handleUpdataValues, selectedValues, values, clear };
}
