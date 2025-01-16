import { FC, PropsWithChildren } from 'react';

import { Skeleton, SkeletonProps } from '@primitives/ui/skeleton';

interface Props extends SkeletonProps {
    isActive?: boolean
}

const Shimmer: FC<PropsWithChildren<Props>> = ({ isActive, children, ...props }) => {
    return isActive ? <Skeleton {...props} /> : children;
};

export default Shimmer;
