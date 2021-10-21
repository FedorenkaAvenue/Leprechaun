import { compileFile } from 'pug';

export default class TemplateService {
    /**
     * @description render template
     * @param pugFilePath Pug template file (without path and .pug extention)
     * @param variables object with variables
     */
    renderTemplate(pugFilePath: string, variables?: object): string {
        return compileFile(`./src/templates/${pugFilePath}.pug`)(variables);
    }    
}
