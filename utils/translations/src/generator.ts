import { writeFile, existsSync, mkdirSync } from 'fs';
import { sync } from 'glob';
import { resolve, parse } from 'path';

const LANGS = process.env.LANGS.split(',');

export interface TransConfig {
    inputPath: string
    outputFolderName: string
}

function generateModules({ inputPath, outputFolderName }: TransConfig): void {
    let LANGS_COUNTER = [...LANGS]; // dicrease and check which language doesn't have translations

    sync(`${inputPath}*.ts`).forEach(async (filePath) => {
        const fileName = parse(filePath).name;

        if (!LANGS.includes(fileName)) return;

        LANGS_COUNTER = LANGS_COUNTER.filter(l => l !== fileName);

        const dir = `dist/${outputFolderName}`;
        const { default: translations } = await import(resolve(filePath));
        const FILE_SRC = `${dir}/${fileName}.json`;

        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

        writeFile(
            FILE_SRC,
            JSON.stringify(translations),
            err => {
                if (err) throw err;

                console.log(`File ${FILE_SRC} has been generated!`);
            }
        )
    });

    if (LANGS_COUNTER.length) {
        throw new Error(`There are no data for ${LANGS_COUNTER.reduce((acc, l) => acc + 'l ', '')}languages!`)
    }
}

export function generateFiles(paths: TransConfig[]): void {
    try {
        paths.forEach(p => generateModules({ ...p }));
    } catch (err) {
        console.log(err);
    }
}
