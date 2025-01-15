import { LabelModel } from '@shared/models/Label';

import { cn } from './primitives/lib/utils';

export interface LabelProps {
    value: LabelModel<unknown>['value']
    classNames?: string
}

const Label = ({ classNames, value }: LabelProps) => {
    return (
        <div className={cn('px-2 text-sm', classNames)}>
            {value}
        </div>
    );
};

export default Label;
