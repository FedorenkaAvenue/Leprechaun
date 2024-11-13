import cn from "@shared/lib/cn";
import { LabelModel } from "@shared/models/Label";

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
