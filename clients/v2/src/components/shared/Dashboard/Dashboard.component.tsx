import ProductPreview from '../ProductPreview';
import { PropsI } from './Dashboard.interface';

import css from './Dashboard.module.scss';

export default function Dashboard({ title, list }: PropsI) {
    return (
        <div>
            <h2 className="my-6 text-xl">{title}</h2>
            <ul className={`grid gap-1 ${css.list}`}>
                {list.map(item => (
                    <li key={item.id}>
                        <ProductPreview {...item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
