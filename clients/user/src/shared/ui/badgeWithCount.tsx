import { FC, PropsWithChildren } from "react";

interface Props {
    count: number | undefined
}

const BadgeWithCount: FC<PropsWithChildren<Props>> = ({ count, children }) => {
    return (
        <div className='relative'>
            {children}
            {count !== 0 && <div className='absolute -top-2 -right-2'>{count}</div>}
        </div>
    );
};

export default BadgeWithCount;
