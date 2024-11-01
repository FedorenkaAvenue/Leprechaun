import { PriceModel } from "@models/Product";

const CURRENCY = process.env.CURRENCY_SYMBOL;

const Price = ({ current, old }: PriceModel) => {
    return (
        <div>
            {
                old && (
                    <div className='text-secondary-foreground text-sm text-decoration-line: line-through'>
                        {old}<span>{CURRENCY}</span>
                    </div>
                )
            }
            <div className="text-achtung text-2xl">
                {current}<span className="text-lg">{CURRENCY}</span>
            </div>
        </div>
    );
};

export default Price;
