import type { ISelectProps } from '../types/types';

import { useState, useEffect, useRef } from 'react';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

import styles from '../styles/select.module.scss';

export const Select = <T extends { id: string | number; name: string }>({
	options,
	currentOption,
	onChooseOption,
}: ISelectProps<T>) => {
	const [isOpenSelectOptions, setIsOpenSelectOptions] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	const openSelectOptions = () => {
		setIsOpenSelectOptions(!isOpenSelectOptions);
	};

	const chooseOption = (option: T) => {
		onChooseOption(option);
		setIsOpenSelectOptions(false);
	};

	const handleClickOutside = () => {
		setIsOpenSelectOptions(false);
	};

	useOnClickOutside(selectRef, handleClickOutside);

	useEffect(() => {
		setIsOpenSelectOptions(false);
	}, []);

	return (
		<div
			ref={selectRef}
			className={`${styles.select} ${
				isOpenSelectOptions ? styles.select_open : ''
			}`}
			onClick={openSelectOptions}>
			<div className={styles.main}>
				<p className={styles.title}>{currentOption.name || ''}</p>
				<div
					className={`${styles.arrow} ${
						isOpenSelectOptions ? styles.arrow_status_open : ''
					}`}></div>
			</div>
			<div
				className={`${styles.options} ${
					isOpenSelectOptions ? styles.options_status_open : ''
				}`}>
				<ul className={styles.list}>
					{options
						.filter((item) => item.id !== currentOption.id)
						.map((item, i) => (
							<li
								className={styles.item}
								key={i}
								onClick={() => chooseOption(item)}>
								<p className={styles.text}>{item.name}</p>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
