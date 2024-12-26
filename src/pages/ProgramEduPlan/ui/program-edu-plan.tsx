import type { FC } from 'react';
import type {
	ISemesterPlan,
	IDiscPlan,
} from '../../../store/educationPlan/types';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { EROUTES } from '../../../shared/utils/routes';
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
import { SemesterDetailForm } from './semester-detail-form';

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

	const handleSemesterDetail = (semesterId: number) => {
		dispatch(setCurrentSemesterId(semesterId));
		dispatch(setIsShowModal({ modal: 'semesterDetail', isShow: true }));
	};

	const closeModal = () => {
		dispatch(setIsShowModal({ modal: 'addHours', isShow: false }));
		dispatch(setIsShowModal({ modal: 'semesterDetail', isShow: false }));
	};

	const calculateTotalZetPerSemester = (
		disciplinesBasic: IDiscPlan[],
		disciplinesSpec: IDiscPlan[],
		semesters: ISemesterPlan[]
	): Record<number, number> => {
		// Инициализация объекта для хранения суммы часов
		const totals: Record<number, number> = {};

		// Устанавливаем начальные значения из существующих данных
		semesters.forEach((semester) => {
			totals[semester.id] = semester.zet_taken || 0;
		});

		// Функция для добавления часов из массива дисциплин
		const addHoursFromDisciplines = (disciplines: IDiscPlan[]) => {
			disciplines.forEach((discipline) => {
				if (discipline.type !== 'module') {
					discipline.semesters.forEach((semesterData) => {
						if (totals.hasOwnProperty(semesterData.semester)) {
							totals[semesterData.semester] += semesterData.zet || 0;
						}
					});
				}
			});
		};

		// Добавляем часы из обоих массивов дисциплин
		addHoursFromDisciplines(disciplinesBasic);
		addHoursFromDisciplines(disciplinesSpec);

		return totals;
	};

	const getYearlyValidationClass = (
		semesterId: number,
		totalZetPerSemester: Record<number, number>,
		semesters: ISemesterPlan[]
	): string => {
		// Найти индекс текущего семестра
		const currentSemesterIndex = semesters.findIndex(
			(s) => s.id === semesterId
		);

		// Определить год (пара семестров: 1+2, 3+4 и т.д.)
		const isOddSemester = currentSemesterIndex % 2 === 0; // Проверяем, четный ли семестр
		const pairedIndex = isOddSemester
			? currentSemesterIndex + 1
			: currentSemesterIndex - 1;

		// Получить сумму ЗЕТ для пары семестров
		const totalZetForYear =
			(totalZetPerSemester[semesters[currentSemesterIndex]?.id] || 0) +
			(totalZetPerSemester[semesters[pairedIndex]?.id] || 0);

		const countHours = program?.form === 'Очная' ? 60 : 70;

		// Возвращаем соответствующий класс для подсветки
		if (totalZetForYear === 0) {
			return styles.total__count_color_green;
		} else if (totalZetForYear > countHours) {
			return styles.total__count_color_red;
		} else {
			return styles.total__count_color_green;
		}
	};

	const totalZetPerSemester = calculateTotalZetPerSemester(
		disciplinesBasic || [],
		disciplinesSpec || [],
		semesters || []
	);

	const countDisciplines = (...disciplineGroups: IDiscPlan[][]): number => {
		return disciplineGroups
			.flat()
			.filter((discipline) => discipline.type !== 'module').length;
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
		disciplines.map((discipline, i) => {
			if (discipline.type === 'module') {
				return (
					<li className={styles.row} key={i}>
						<div className={`${styles.discipline}`}>
							<div
								className={`${styles.discipline__main} ${styles.discipline__main_type_module}`}>
								<h6 className={styles.discipline__name}>{discipline.name}</h6>
							</div>
						</div>
					</li>
				);
			} else {
				return (
					<li className={styles.row} key={discipline.id}>
						<div
							className={`${styles.column} ${styles.column_width_full} ${styles.column_margin_left}`}>
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
																	{activeSemester.zet}
																	<span
																		className={`${styles.count__hours_font_small}`}>
																		{' '}
																		ЗЕТ
																	</span>
																</span>
																{activeSemester.control && (
																	<p className={`${styles.count__form}`}>
																		{extractFromBrackets(
																			activeSemester.control
																		)}
																	</p>
																)}
															</>
														) : (
															<span className={`${styles.count__hours}`}>
																?
															</span>
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
				);
			}
		});

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
										Перечень дисциплин (
										{countDisciplines(
											disciplinesSpec || [],
											disciplinesBasic || []
										)}
										)
									</p>
								</div>
							</div>
							<div className={`${styles.column}`}>
								<ul className={styles.semesters}>
									{semesters.map((semester, i) => (
										<li className={`${styles.semester}`} key={semester.id}>
											<div
												className={`${styles.count} ${styles.count_type_small}`}>
												<p
													className={`${styles.text} ${styles.text_fs_small} ${styles.text_align_center}`}>
													{i + 1} семестр
												</p>
											</div>
											<div
												className={styles.count}
												onClick={() => handleSemesterDetail(semester.id)}>
												<p className={`${styles.total}`}>Сумма</p>
												<p
													className={`${
														styles.total__count
													} ${getYearlyValidationClass(
														semester.id,
														totalZetPerSemester,
														semesters
													)}`}>
													{totalZetPerSemester[semester.id] || 0} ЗЕТ
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
						<ul className={styles.table__list} style={{ height: listHeight }}>
							{disciplinesBasic &&
								renderDisciplines(
									disciplinesBasic,
									styles.discipline__status_type_opd,
									'ОПД'
								)}
							{disciplinesSpec &&
								renderDisciplines(
									disciplinesSpec,
									styles.discipline__status_type_pd,
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
			{isShowModal.semesterDetail && (
				<Modal
					title='Наполнение семестра'
					isOpen={isShowModal.semesterDetail}
					onClose={closeModal}>
					<SemesterDetailForm />
				</Modal>
			)}
		</div>
	);
};
