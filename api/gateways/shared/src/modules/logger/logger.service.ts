import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { mkdir, appendFile } from 'fs/promises';

type LogT = LogLevel | 'info';

/**
 * @description custom logger
 *  all errors should be dublicated and written to log files
 *  all console.log only on app terminal
 *  specific info logs (only for writing to files)
 */
@Injectable()
export default class LoggerService extends ConsoleLogger {
    static contextsToIgnore = ['InstanceLoader', 'RoutesResolver', 'RouterExplorer', 'NestFactory'];

    public log(_: any, context?: string): void {
        if (context && LoggerService.contextsToIgnore.includes(context)) return;

        super.log.apply(this, arguments as any);
    }

    public info(message: string): void {
        this.writeLog(message, 'info');
    }

    public error(message: string, stack?: string, context?: string): void {
        this.writeLog(message + stack, 'error');
        super.error(message, stack, context);
    }

    /**
     * @description create and write log files
     * @param message log message
     * @param type log level
     */
    private async writeLog(message: string, type: LogT): Promise<void> {
        const currDate = new Date();
        const logFolder = `logs/${currDate.getMonth() + 1}_${currDate.getFullYear()}`;

        try {
            await appendFile(`${logFolder}/${type}.log`, `${currDate.toLocaleString()}: ${message}.\n`);
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
