import Image from 'next/image';
import Link from 'next/link';

import { PropsI } from "./HeaderIcon.interface";

const HeaderIcon = ({ icon, link, alt, isLoading, count }: PropsI) => {
    return (
        <li className="mx-2">
            <Link href={link}>
                <Image src={icon} alt={alt} />
                {isLoading && 'load...'}
                <div>{count}</div>
            </Link>
        </li>
    );
};

export default HeaderIcon;
