export default function getLanguages(): string[] {
    return (process.env.NEXT_PUBLIC_LANGS as string).split(',');
}
