import type { IRegistrationForm } from '../types/types';
import type { TFormValidationErrors } from '../../../shared/components/Form/types/types';

import {
	required,
	minLength,
	emailFormat,
} from '../../../shared/lib/validationRules';

export const links = [{ label: 'Уже есть аккаунт?', text: 'Войти', url: '/' }];

export const validationSchema = {
	lastName: [required('Введите фамилию')],
	firstName: [required('Введите имя')],
	fatherName: [required('Введите отчество')],
	email: [
		required('Введите электронную почту'),
		emailFormat('Неверный формат электронной почты'),
	],
	password: [
		required('Введите пароль'),
		minLength(6, 'Пароль должен быть не менее 6 символов'),
	],
};

export const shouldBlockSubmit = (
	values: IRegistrationForm,
	errors: TFormValidationErrors
): boolean => {
	return (
		!values.lastName.trim() ||
		!!errors.lastName ||
		!values.firstName.trim() ||
		!!errors.firstName ||
		!values.fatherName.trim() ||
		!!errors.fatherName ||
		!values.email.trim() ||
		!!errors.email ||
		!values.password.trim() ||
		!!errors.password
	);
};
