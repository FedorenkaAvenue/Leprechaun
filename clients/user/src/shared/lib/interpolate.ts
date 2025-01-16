
/**
 * @description interpolate string with variables
 * @param {String} str string with variables which should interpolate
 * @param {Array} vars variable's values
 * @returns completed string
 */
export default function interpolate(str: string, vars: string[] | number[]): string | undefined {
    return str && str.replace(/\$(\d+)/g, (_, index) => String(vars[index - 1]) || 'UNDEFINED');
}
