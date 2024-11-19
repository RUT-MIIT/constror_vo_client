import { required } from '../../../shared/lib/validationRules';

export const validationSchema = {
	profile: [required('Введите профиль')],
};
