import type { FC, FormEvent } from 'react';

import { PublicLayout } from '../../../shared/components/Layout/PublicLayout/ui/public-layout';
import { Section } from '../../../shared/components/Section/ui/section';
import { Form } from '../../../shared/components/Form/ui/form';
import { FormField } from '../../../shared/components/Form/components/FormField/form-field';
import { FormInput } from '../../../shared/components/Form/components/FormInput/form-input';
import { FormLinks } from '../../../shared/components/Form/components/FormLinks/form-links';

import { useForm } from '../../../hooks/useForm';
import {
	required,
	minLength,
	emailFormat,
} from '../../../shared/lib/validationRules';

import styles from '../styles/login.module.scss';

const links = [
	{ label: 'Новый пользователь?', text: 'Регистрация', url: '/registration' },
];

interface ILoginForm {
	email: string;
	password: string;
}

const validationSchema = {
	email: [
		required('Введите электронную почту'),
		emailFormat('Неверный формат электронной почты'),
	],
	password: [
		required('Введите пароль'),
		minLength(6, 'Пароль должен быть не менее 6 символов'),
	],
};

export const Login: FC = () => {
	const { values, handleChange, errors } = useForm<ILoginForm>(
		{ email: '', password: '' },
		validationSchema
	);

	const handleLogin = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!errors.email && !errors.password) {
			console.log('Форма отправлена', values);
		} else {
			console.log('Ошибки в форме');
		}
	};

	return (
		<PublicLayout>
			<main className={styles.container}>
				<Section>
					<Form
						name='form-login'
						onSubmit={handleLogin}
						title='Вход в Конструктор ВО'
						titleAlign='center'>
						<FormField
							title='Электронная почта:'
							fieldError={{ text: errors.email || '', isShow: !!errors.email }}>
							<FormInput
								name='email'
								value={values.email}
								onChange={handleChange}
							/>
						</FormField>
						<FormField
							title='Пароль:'
							fieldError={{
								text: errors.password || '',
								isShow: !!errors.password,
							}}>
							<FormInput
								name='password'
								value={values.password}
								onChange={handleChange}
							/>
						</FormField>
					</Form>
				</Section>
				<FormLinks links={links} />
			</main>
		</PublicLayout>
	);
};
