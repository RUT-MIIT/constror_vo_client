import type { FC, FormEvent } from 'react';

import { useDispatch, useSelector } from '../../../store/store';

import {
	sendProductsWizardDataStepThree,
	sendProductsWizardDataStepFour,
} from '../../../store/product/actions';
import {
	setCurrentProduct,
	setIsLoadingProductWizard,
	setIsShowProductWizard,
} from '../../../store/product/reducer';
import { getProgramNsiList } from '../../../store/catalog/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import { FormField } from '../../../shared/components/Form/components';
import { WizardMain, WizardButtons } from '../../../shared/components/Wizard';
import { Table } from '../../../shared/components/Table/ui/table';
import { Button } from '../../../shared/components/Button/ui/button';

interface IProductsWizardStepFourProps {
	goToPreviousStep: () => void;
}

export const ProductsWizardStepFour: FC<IProductsWizardStepFourProps> = ({
	goToPreviousStep,
}) => {
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);
	const { productWizardData } = useSelector((state) => state.product);
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (program) {
			const products = productWizardData?.steps[3]?.result_json?.products || [];
			if (products.length === 0) {
				console.error('Products array cannot be empty');
				return;
			}
			const data = {
				programId: program.id,
				products,
			};
			try {
				await dispatch(sendProductsWizardDataStepFour(data)).unwrap();
				await dispatch(getProgramNsiList(program.id)).unwrap();
				dispatch(setIsLoadingProductWizard(false));
				dispatch(setIsShowProductWizard(false));
				dispatch(setCurrentProduct(null));
			} catch (error) {
				console.error('Ошибка при выполнении запроса:', error);
			}
		}
	};

	const handleRegenerate = () => {
		if (program) {
			dispatch(sendProductsWizardDataStepThree(program.id));
		}
	};

	return (
		<>
			<WizardMain>
				<Form name='create-products-wizard-step-4' onSubmit={handleSubmit}>
					<FormField title='Нормативно-справочная информация для продуктов:'>
						<Table marginTop='20'>
							<div className='table__header'>
								<div className='table__main-column table__main-column_type_empty'>
									<div className='table__column table__column_type_header table__column_type_full'>
										<p className='table__text table__text_type_header'>
											Наименование продукта
										</p>
									</div>
									<div className='table__column table__column_type_header table__column_type_full'>
										<p className='table__text table__text_type_header'>
											Нормативный акт
										</p>
									</div>
									<div className='table__column table__column_type_header table__column_type_full'>
										<p className='table__text table__text_type_header'>
											Организация
										</p>
									</div>
									<div className='table__column table__column_type_header table__column_type_medium'>
										<p className='table__text table__text_type_header'>Год</p>
									</div>
								</div>
							</div>
							<ul className='table__main'>
								{productWizardData?.steps[3]?.result_json?.products.map(
									(product) => {
										return product.nsis.map((nsi, index) => (
											<li
												className='table__row'
												key={`${product.name}-${nsi.name}`}>
												<div className='table__main-column'>
													<div
														className={`table__column table__column_type_full ${
															product.nsis.length - 1 === index
																? ''
																: 'table__column_type_merged'
														} `}>
														<p className='table__text table__text_weight_bold'>
															{index === 0 ? product.name : ''}
														</p>
													</div>
													<div className='table__column table__column_type_full'>
														<p className='table__text'>{nsi.name}</p>
													</div>
													<div className='table__column table__column_type_full'>
														<p className='table__text'>{nsi.author}</p>
													</div>
													<div className='table__column table__column_type_medium'>
														<p className='table__text'>{nsi.year}</p>
													</div>
												</div>
											</li>
										));
									}
								)}
							</ul>
						</Table>
					</FormField>
				</Form>
			</WizardMain>
			<WizardButtons>
				<Button type='button' text='Назад' onClick={goToPreviousStep} />
				<Button
					type='button'
					text='Перегенерировать'
					style='magic'
					onClick={handleRegenerate}
				/>
				<Button
					type='submit'
					text='Сохранить'
					form='create-products-wizard-step-4'
				/>
			</WizardButtons>
		</>
	);
};
