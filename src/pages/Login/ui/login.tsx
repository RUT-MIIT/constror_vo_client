import type { FC, FormEvent } from 'react';
import type { ILoginForm } from '../types/types';

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
import { Link } from '../../../shared/components/Link/ui/link';

import { links, validationSchema, shouldBlockSubmit } from '../lib/helpers';

import { loginUser } from '../../../store/user/actions';

import styles from '../styles/login.module.scss';

export const Login: FC = () => {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.user);
	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);
	const { values, handleChange, errors } = useForm<ILoginForm>(
		{ email: '', password: '' },
		validationSchema
	);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isBlockSubmit) {
			dispatch(loginUser(values));
		}
	};

	const handleClick = () => {
		console.log('click');
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit(values, errors));
	}, [values, errors]);

	return (
		<PublicLayout>
			<main className={styles.container}>
				<Section>
					<Form
						name='form-login'
						onSubmit={handleSubmit}
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
						<Link
							text='Проектирование от компетентносного профиля'
							path='https://constructor-vo.emiit.ru/'
						/>
						<FormButtons>
							<Button
								text='Забыли пароль?'
								style='cancel'
								width='full'
								onClick={handleClick}></Button>
							<Button
								type='submit'
								text='Вход'
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
