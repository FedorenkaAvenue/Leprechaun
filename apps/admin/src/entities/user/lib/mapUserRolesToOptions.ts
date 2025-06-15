import { UserRole } from '@gen/user';
import { Option } from '@shared/models/interfaces';

export default function mapUserRolesToOptions(): Option[] {
    return Object.entries(UserRole)
        .filter(([_, value]) => typeof value === 'number')
        .map(([title, id]) => ({ id, title }));
}
