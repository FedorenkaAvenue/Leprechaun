import { compileFile } from 'pug';

/**
 * @description html template service
 */
class TemplateService {
    /**
     * @description render template
     * @param pugFilePath Pug template file (without path and .pug extention)
     * @param variables object with variables
     * @returns completed HTML
     */
    renderTemplate(pugFilePath: string, variables?: object): string {
        return compileFile(`./src/templates/${pugFilePath}.pug`)(variables);
    }    
}

export default new TemplateService();
