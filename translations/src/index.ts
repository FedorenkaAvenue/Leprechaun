import { TransConfig, generateFiles } from './generator';

const JOBS: TransConfig[] = [
    {
        inputPath: './src/data/client_user/locales/',
        outputFolderName: 'client_user',
    },
];

generateFiles(JOBS);
