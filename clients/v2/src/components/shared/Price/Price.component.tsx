import { PriceSchema } from '@interfaces/Price';

const { CURRENCY_SYMBOL } = process.env;

export default function Price({ current, old }: PriceSchema) {
    return (
        <div>
            {old && (
                <div className="text-xs line-through text-gray-500">
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
