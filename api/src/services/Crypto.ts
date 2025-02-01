import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

const SALT_ITERATIONS = 10;

@Injectable()
export default class CryptoService {
    private async genSalt(): Promise<string> {
        return await bcrypt.genSalt(SALT_ITERATIONS);
    }

    public async hash(str: string): Promise<string> {
        return await bcrypt.hash(str, await this.genSalt());
    }

    public checkHash(original: string, hash: string): Promise<boolean> {
        return bcrypt.compare(original, hash);
    }
}
