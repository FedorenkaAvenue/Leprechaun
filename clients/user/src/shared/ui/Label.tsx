import { LabelModel } from "@shared/models/Label";

import { cn } from "./primitives/lib/utils";

export interface LabelProps {
    value: LabelModel<unknown>['value']
    classNames?: string
}

const Label = ({ classNames, value }: LabelProps) => {
    return (
        <span className={cn("px-2 py-0.5", classNames)}>
            {value}
        </span>
    );
};

export default Label;
