import { writeFile } from 'fs';
import { sync } from 'glob';
import { resolve, parse } from 'path';

generateModules('./src/client/locales/', '../clients/user/src/assets/locales/'); // client

/**
 * @description generate translations for locales
 * @param inputPath folder path with locales
 * @param outputPath output path folder
 * @return compiled JSON files with naming
 */
function generateModules(inputPath: string, outputPath: string): void {
	sync(`${inputPath}*.ts`).forEach(async (filePath) => {
		const { default: translations } = await import(resolve(filePath));
		const FILE_SRC = `${outputPath}${parse(filePath).name}.json`;

		writeFile(
			FILE_SRC,
			JSON.stringify(translations),
			(err) => {
				if (err) throw err;

				console.log(`File ${FILE_SRC} has been generated!`);
			}
		)
	});
}
