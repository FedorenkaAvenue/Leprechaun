import { Option } from '@shared/models/interfaces';
import { UserRole } from '../model/enums';

export default function mapUserRolesToOptions(): Option[] {
    return Object.entries(UserRole)
        .filter(([_, value]) => typeof value === 'number')
        .map(([title, id]) => ({ id, title }));
}
