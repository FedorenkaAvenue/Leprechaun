import Link from 'next/link';
import Image from 'next/image';

import cartIcon from '@root/public/icons/cart.svg';
import WishListIcon from './WishlistIcon';

const MainLayout = () => {
    return (
        <div>
            <header className="flex justify-between p-3">
                <div>
                    <Link href="/">
                        {process.env.APP_NAME}
                    </Link>
                </div>
                <nav>
                    <ul className="flex gap-3">
                        {/* <ul className="flex">
                            <li className="mx-2">
                                <Link href="/">
                                    en
                                </Link>
                            </li>{' '}
                            |
                            <li className="mx-2">
                                <Link href="/">
                                    it
                                </Link>
                            </li>
                        </ul> */}
                        <li>
                            <Link href="/catalogue">
                                catalogue
                            </Link>
                        </li>
                        <WishListIcon />
                        <li>
                            <Link href="/cart">
                                <Image src={cartIcon} alt="cart" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default MainLayout;
