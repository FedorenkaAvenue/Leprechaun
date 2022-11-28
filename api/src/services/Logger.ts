import { ConsoleLogger, LogLevel } from '@nestjs/common';
import { mkdir, appendFile } from 'fs/promises';

type LogT = LogLevel | 'info';

/**
 * @description custom logger
 *  all errors should be dublicated and written to log files
 *  all console.log only on app terminal
 *  specific info logs (only for writing to files)
 */
class Logger extends ConsoleLogger {
    info(message: string): void {
        this.writeLog(message, 'info');
    }

    error(message: string, stack?: string, context?: string): void {
        this.writeLog(message + stack, 'error');
        super.error(message, stack, context);
    }

    /**
     * @description create and write log files
     * @param message log message
     * @param type log level
     */
    async writeLog(message: string, type: LogT): Promise<void> {
        const currDate = new Date();
        const logFolder = `logs/${currDate.getMonth()}_${currDate.getFullYear()}`;

        try {
            await appendFile(`${logFolder}/${type}.log`, `\n${currDate.toLocaleString()}: ${message}.`);
        } catch (_) {
            try {
                console.log('try to create new folder for logs...');
                await mkdir(logFolder, { recursive: true });
                this.writeLog(message, type);
            } catch (err) {
                super.error(`Cann\'t write log file: ${err}`);
            }
        }
    }
}

const logger = new Logger();

export default logger;
