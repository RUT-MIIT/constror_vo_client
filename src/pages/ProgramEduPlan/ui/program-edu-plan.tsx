import type { FC } from 'react';
import type { IDiscPlan } from '../../../store/educationPlan/types';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';
import { convertToRoman } from '../../../shared/lib/convertToRoman';
import { extractFromBrackets } from '../../../shared/lib/extractFromBrackets';

import { getInitialData } from '../../../store/educationPlan/actions';
import {
	setCurrentDiscipline,
	setCurrentSemesterId,
	setIsShowModal,
} from '../../../store/educationPlan/reducer';

import { Section, SectionImg } from '../../../shared/components/Section';
import { Preloader } from '../../../shared/components/Preloader/ui/preloader';
import { Button } from '../../../shared/components/Button/ui/button';
import { Modal } from '../../../shared/components/Modal/ui/modal';
import { AddHoursForm } from './add-hours-form';

import styles from '../styles/program-edu-plan.module.scss';

export const ProgramEduPlan: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { program } = useSelector((state) => state.programDetail);

	const {
		semesters,
		disciplinesBasic,
		disciplinesSpec,
		isShowModal,
		loadingData,
		errorData,
	} = useSelector((state) => state.eduPlan);

	const containerRef = useRef<HTMLDivElement>(null);
	const headerRef = useRef<HTMLDivElement>(null);
	const [listHeight, setListHeight] = useState<string>('0px');

	const fetchInitialData = async () => {
		if (program) {
			await Promise.all([dispatch(getInitialData(program.id))]);
		}
	};

	const handleAddHours = (discipline: IDiscPlan, semesterId: number) => {
		dispatch(setCurrentDiscipline(discipline));
		dispatch(setCurrentSemesterId(semesterId));
		dispatch(setIsShowModal({ modal: 'addHours', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addHours', isShow: false }));
	};

	useEffect(() => {
		fetchInitialData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (containerRef.current && headerRef.current) {
			const containerHeight = containerRef.current.offsetHeight;
			const headerHeight = headerRef.current.offsetHeight;
			setListHeight(`${containerHeight - headerHeight - 40 - 20}px`);
		}
	}, []);

	if (loadingData) {
		return <Preloader />;
	}

	if (errorData) {
		return <>{errorData && <p>Ошибка при загрузке исходных данных</p>}</>;
	}

	const renderDisciplines = (
		disciplines: IDiscPlan[],
		statusClass: string,
		statusText: string
	) =>
		disciplines.map((discipline) => (
			<li className={styles.row} key={discipline.id}>
				<div className={`${styles.column} ${styles.column_width_full}`}>
					<div className={styles.discipline}>
						<span className={`${styles.discipline__status} ${statusClass}`}>
							{statusText}
						</span>
						<div className={styles.discipline__main}>
							<h6 className={styles.discipline__name}>{discipline.name}</h6>
						</div>
					</div>
				</div>
				<div className={styles.column}>
					<ul className={styles.semesters}>
						{semesters &&
							semesters.map((semester) => {
								const activeSemester = discipline.semesters.find(
									(s) => s.semester === semester.id
								);
								return (
									<li
										className={`${styles.count} ${
											activeSemester ? styles.count_type_active : ''
										}`}
										key={semester.id}
										onClick={() => handleAddHours(discipline, semester.id)}>
										{activeSemester ? (
											<>
												{activeSemester.zet ? (
													<>
														<span className={`${styles.count__hours}`}>
															{activeSemester.zet + ' зет'}
														</span>
														{activeSemester.control && (
															<p className={`${styles.count__form}`}>
																{extractFromBrackets(activeSemester.control)}
															</p>
														)}
													</>
												) : (
													<span className={`${styles.count__hours}`}>?</span>
												)}
											</>
										) : (
											<></>
										)}
									</li>
								);
							})}
					</ul>
				</div>
			</li>
		));

	return (
		<div className={styles.container}>
			<SectionImg
				sectionWidth='full'
				sectionTitle={{ text: 'Учебный план' }}
				sectionDescription='Процесс проектирования проекта учебного плана с использованием искусственного интеллекта, направленный на оптимизацию работы за счёт поэтапного заполнения данных и автоматической генерации решений.'>
				<div className={styles.buttons}>
					<Button width='auto' text='Создать учебный план' isBlock={true} />
					{program ? (
						<Button
							text='Следующий этап'
							style='light'
							onClick={() =>
								navigate(`${EROUTES.PROGRAM}/${program.id}/design-plan`)
							}
						/>
					) : (
						<Button text='Следующий этап' isBlock={true} />
					)}
				</div>
			</SectionImg>
			<Section
				sectionWidth='full'
				sectionTitle={{
					text: 'Проектирование проекта учебного плана',
				}}>
				{semesters && (
					<div className={styles.table} ref={containerRef}>
						<div
							className={`${styles.row} ${styles.row_type_header}`}
							ref={headerRef}>
							<div className={`${styles.column} ${styles.column_width_full}`}>
								<div className={styles.card}>
									<p
										className={`${styles.text} ${styles.text_fs_large} ${styles.text_align_center}`}>
										Дисциплины
									</p>
								</div>
							</div>
							<div className={`${styles.column}`}>
								<div className={styles.card}>
									<p
										className={`${styles.text} ${styles.text_fs_large} ${styles.text_align_center}`}>
										Семестры
									</p>
								</div>
								<ul className={styles.semesters}>
									{semesters.map((semester, i) => (
										<li
											className={`${styles.count} ${styles.count_type_header}`}
											key={semester.id}>
											<p
												className={`${styles.text} ${styles.text_fs_medium} ${styles.text_align_center}`}>
												{convertToRoman(i + 1)}
											</p>
										</li>
									))}
								</ul>
							</div>
						</div>
						<ul className={styles.table__list} style={{ height: listHeight }}>
							{disciplinesBasic &&
								renderDisciplines(
									disciplinesBasic,
									styles.discipline__status_color_red,
									'ОПД'
								)}
							{disciplinesSpec &&
								renderDisciplines(
									disciplinesSpec,
									styles.discipline__status_color_green,
									'ПД'
								)}
						</ul>
					</div>
				)}
			</Section>
			{isShowModal.addHours && (
				<Modal
					title='Прикрепление дисциплины к семестру'
					isOpen={isShowModal.addHours}
					onClose={closeModal}>
					<AddHoursForm />
				</Modal>
			)}
		</div>
	);
};
