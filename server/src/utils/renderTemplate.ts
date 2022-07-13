import { compileFile } from 'pug';

/**
 * @description render template
 * @param pugFilePath Pug template file (without path and .pug extention)
 * @param variables object with variables
 * @returns completed HTML
 */
export default function renderTemplate(pugFilePath: string, variables?: object): string {
    return compileFile(`./src/templates/${pugFilePath}.pug`)(variables);
}
