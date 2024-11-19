import type { FC, FormEvent } from 'react';
import type { IRegistrationForm } from '../types/types';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';
import { useForm } from '../../../hooks/useForm';

import { PublicLayout } from '../../../shared/components/Layout/PublicLayout/ui/public-layout';
import { Section } from '../../../shared/components/Section/ui/section';
import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInput,
	FormButtons,
	FormLinks,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import { links, validationSchema, shouldBlockSubmit } from '../lib/helpers';

import { registerUser } from '../../../store/user/actions';

import styles from '../styles/registration.module.scss';

export const Registration: FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.user);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<IRegistrationForm>(
		{ lastName: '', firstName: '', fatherName: '', email: '', password: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			dispatch(
				registerUser({
					email: values.email,
					first_name: values.firstName,
					last_name: values.lastName,
					middle_name: values.fatherName,
					password1: values.password,
					password2: values.password,
				})
			);
		}
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values, errors));
	}, [values, errors]);

	return (
		<PublicLayout>
			<main className={styles.container}>
				<Section>
					<Form
						name='form-registration'
						onSubmit={handleSubmit}
						title='Регистрация'
						titleAlign='center'>
						<FormField
							title='Фамилия:'
							fieldError={{
								text: errors.lastName || '',
								isShow: !!errors.lastName,
							}}>
							<FormInput
								name='lastName'
								value={values.lastName}
								onChange={handleChange}
							/>
						</FormField>
						<FormField
							title='Имя:'
							fieldError={{
								text: errors.firstName || '',
								isShow: !!errors.firstName,
							}}>
							<FormInput
								name='firstName'
								value={values.firstName}
								onChange={handleChange}
							/>
						</FormField>
						<FormField
							title='Отчество:'
							fieldError={{
								text: errors.fatherName || '',
								isShow: !!errors.fatherName,
							}}>
							<FormInput
								name='fatherName'
								value={values.fatherName}
								onChange={handleChange}
							/>
						</FormField>
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
						<FormButtons>
							<Button
								type='submit'
								text='Зарегистрироваться'
								width='full'
								isBlock={isBlockSubmit || isLoading}></Button>
						</FormButtons>
					</Form>
				</Section>
				<FormLinks links={links} />
			</main>
		</PublicLayout>
	);
};
