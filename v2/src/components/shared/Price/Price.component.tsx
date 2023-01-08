import { PropsI } from './Price.interface';

const { CURRENCY_SYMBOL } = process.env;

export default function Price({ current, old }: PropsI) {
    return (
        <div className='leading-5'>
            {old && (
                <div className="text-xs line-through text-gray-400">
                    {old}
                    {CURRENCY_SYMBOL}
                </div>
            )}
            <div className={`text-2xl ${old && 'text-red-500'}`}>
                {current}
                {CURRENCY_SYMBOL}
            </div>
        </div>
    );
}
