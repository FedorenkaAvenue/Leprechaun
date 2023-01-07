import Image from 'next/image';

import Link from '@components/ui/Link';
import { PropsI } from "./HeaderIcon.interface";

const HeaderIcon = ({ icon, link, alt, isLoading, count, locale }: PropsI) => {
    return (
        <li className="mx-2">
            <Link locale={locale} href={link}>
                <Image src={icon} alt={alt} />
                {isLoading && 'load...'}
                <div>{count}</div>
            </Link>
        </li>
    );
};

export default HeaderIcon;
