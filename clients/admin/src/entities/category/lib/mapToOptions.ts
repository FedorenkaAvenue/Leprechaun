import { Trans } from "@shared/models/interfaces";
import { CategoryPreview } from "../model/interfaces";
import { Option } from '@shared/models/interfaces';

export default function mapToOptions(categories: CategoryPreview[], lang: keyof Trans): Option[] {
    return categories.map(({ url, title }) => ({ id: url, title: title[lang] }));
}
