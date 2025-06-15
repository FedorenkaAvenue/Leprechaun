import { CategoryPreview } from "@gen/_category_preview";
import { Trans } from "@shared/models/interfaces";
import { Option } from '@shared/models/interfaces';

export default function mapToOptions(categories: CategoryPreview[], lang: keyof Trans): Option[] {
    return categories.map(({ id, title }) => ({ id: id, title: title[lang] }));
}
