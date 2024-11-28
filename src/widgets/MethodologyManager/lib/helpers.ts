import { required } from '../../../shared/lib/validationRules';

export const validationSchema = {
	name: [required('Поле не может быть пустьм')],
};
