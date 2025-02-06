/**
 * @description check if enum contains key
 * @param en enum
 * @returns boolean result
 */
export default function availableEnum(key: any, en: { [key: string]: string | number }): boolean {
    return typeof en[key] !== 'undefined';
}
