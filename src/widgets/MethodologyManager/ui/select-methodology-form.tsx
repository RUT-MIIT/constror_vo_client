import type { FC } from 'react';
import type { ISelectMethodologyFormProps, IMethodology } from '../types/types';

import { useState, useEffect, useMemo } from 'react';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Select } from '../../../shared/components/Select/ui/select';
import { Button } from '../../../shared/components/Button/ui/button';

const methodologyOptions = [
	{
		id: 0,
		name: 'Выберите из списка..',
	},
	{
		id: 1,
		name: 'Типовая модель жизненного цикла по стандарту ISO',
	},
	{
		id: 2,
		name: 'Типовая модель жизненного цикла по версии Министерства обороны США',
	},
	{
		id: 3,
		name: 'Типовая модель жизненного цикла системы Национального общества профессиональных инженеров (NSPE)',
	},
	{
		id: 4,
		name: 'Типовая модель жизненного цикла продукции по Р 50-605-80-93',
	},
];

export const SelectMethodologyForm: FC<ISelectMethodologyFormProps> = ({
	currentValues,
	onSelect,
}) => {
	const [currentMethodology, setCurrentMethodology] = useState<IMethodology>(
		methodologyOptions[0]
	);

	const availableOptions = useMemo(() => {
		return methodologyOptions.filter(
			(option) => !currentValues.includes(option.name)
		);
	}, [currentValues]);

	const [isBlockSubmit, setIsBlockSubmit] = useState<boolean>(true);

	const handleChangeMethodology = (option: IMethodology) => {
		setCurrentMethodology(option);
	};

	const handleSelectMethodology = () => {
		onSelect(currentMethodology.name);
	};

	const shouldBlockSubmit = (): boolean => {
		return currentMethodology.id === 0;
	};

	useEffect(() => {
		setIsBlockSubmit(shouldBlockSubmit());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentMethodology]);

	useEffect(() => {
		setCurrentMethodology(methodologyOptions[0]);
		setIsBlockSubmit(true);
	}, []);

	return (
		<Form name='form-select-methodology'>
			<FormField title='Наименование:'>
				<Select
					currentOption={currentMethodology}
					options={availableOptions}
					onChooseOption={handleChangeMethodology}
				/>
			</FormField>
			<FormButtons>
				<Button
					type='button'
					text='Добавить'
					width='full'
					isBlock={isBlockSubmit}
					onClick={handleSelectMethodology}
				/>
			</FormButtons>
		</Form>
	);
};
