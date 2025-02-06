import { v4 } from 'uuid';

/**
 * @description generate UUUID
 * @returns UUID
 */
export function genUUID(): string {
    return v4();
}

/**
 * @description generate 12-digits number ID
 * @returns generated ID
 */
export function genID(): number {
    return Math.floor(Math.random() * Date.now());
}
