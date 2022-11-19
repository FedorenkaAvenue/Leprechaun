/**
 * @description config methods only for development
 */
export class ConfigDevService {
    /**
     * @description create simple session ID (incrementing +1)
     * @returns {Function} callback which returns session ID
     */
    genSessionId(): (req: Express.Request) => string {
        let count = 0;

        // eslint-disable-next-line no-unused-vars
        return function (req: Express.Request): string {
            return String(++count);
        };
    }
}
