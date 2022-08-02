export class NavigationLink {
    constructor(
        public readonly url: string,
        public readonly label: string,
        public readonly icon: string | null = null,
        public readonly params?: string
    ) {}
}