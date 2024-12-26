export default function interpolate(str: string, vars: string[] | number[]): string | undefined {
    return str && str.replace(/\$(\d+)/g, (_, index) => String(vars[index - 1]) || "UNDEFINED");
}
