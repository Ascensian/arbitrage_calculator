import * as crypto from 'crypto';

export class CryptoUtils {
    static sha256(str: string): string {
        const hash = crypto.createHash('sha256');
        hash.update(str);
        return hash.digest('hex');
    }

    static randomToken(): string {
        return crypto.randomBytes(64).toString('hex');
    }
}
