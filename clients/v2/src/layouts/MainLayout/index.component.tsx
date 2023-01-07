import Image from 'next/image';

import Link from '@components/ui/Link';
import cartIcon from '@root/public/icons/cart.svg';
import HeaderIcon from './HeaderIcon';
import WishListIcon from './WishlistIcon';

const MainLayout = ({ locale }: any) => {
    return (
        <div>
            <header className="flex justify-between p-3">
                <div>
                    <Link locale={locale} href="/">
                        {process.env.APP_NAME}
                    </Link>
                </div>
                <nav>
                    <ul className="flex gap-3">
                        <ul className="flex">
                            <li className="mx-2">
                                <Link href="/" locale={locale}>
                                    en
                                </Link>
                            </li>{' '}
                            |
                            <li className="mx-2">
                                <Link href="/" locale={locale}>
                                    it
                                </Link>
                            </li>
                        </ul>
                        <Link locale={locale} href="/catalogue">
                            catalogue
                        </Link>
                        <li>user</li>
                        <WishListIcon locale={locale} />
                        <li>
                            <Link locale={locale} href="/cart">
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
