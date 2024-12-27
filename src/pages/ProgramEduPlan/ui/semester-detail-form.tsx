import type { FC, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store/store';

import { setHoursToSemester } from '../../../store/educationPlan/actions';

import { Form } from '../../../shared/components/Form/ui/form';
import {
	FormField,
	FormInputNumber,
	FormButtons,
} from '../../../shared/components/Form/components';
import { Button } from '../../../shared/components/Button/ui/button';

import styles from '../styles/semester-detail.module.scss';

export const SemesterDetailForm: FC = () => {
	const dispatch = useDispatch();

	const { program } = useSelector((state) => state.programDetail);
	const { semesters, currentSemesterId, disciplinesBasic, disciplinesSpec } =
		useSelector((state) => state.eduPlan);

	const [hours, setHours] = useState<number | null>(0);
	const [disciplineCount, setDisciplineCount] = useState<number | null>(0);

	const [semesterDetail, setSemesterDetail] = useState<{
		semesterName: string;
		disciplines: { name: string; zet: number }[];
	}>({
		semesterName: '',
		disciplines: [],
	});

	const handleChangeHours = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(e.target.value);
		setHours(value);
	};

	const handleChangeDisciplineCount = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = Number(e.target.value);
		setDisciplineCount(value);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (program && currentSemesterId) {
			const data = {
				plan_disc: disciplineCount || 0,
				plan_zet: hours || 0,
			};
			dispatch(
				setHoursToSemester({
					programId: program.id,
					semesterId: currentSemesterId,
					semester: data,
				})
			);
		}
	};

	useEffect(() => {
		if (semesters && disciplinesBasic && disciplinesSpec) {
			// Найдем текущий семестр по currentSemesterId
			const currentSemester = semesters.find(
				(semester) => semester.id === currentSemesterId
			);

			// Если семестр найден
			if (currentSemester) {
				// Соберем все дисциплины, относящиеся к этому семестру
				const relatedDisciplines: { name: string; zet: number }[] = [];

				// Получаем дисциплины из basic и spec, которые относятся к этому семестру
				const allDisciplines = [...disciplinesBasic, ...disciplinesSpec];

				allDisciplines.forEach((discipline) => {
					if (discipline.type !== 'module') {
						discipline.semesters.forEach((semesterData) => {
							if (semesterData.semester === currentSemesterId) {
								relatedDisciplines.push({
									name: discipline.name,
									zet: semesterData.zet || 0,
								});
							}
						});
					}
				});

				setHours(currentSemester.plan_zet);
				setDisciplineCount(currentSemester.plan_disc);

				setSemesterDetail({
					semesterName: currentSemester.name,
					disciplines: relatedDisciplines,
				});
			}
		}
	}, [semesters, currentSemesterId, disciplinesBasic, disciplinesSpec]);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>{semesterDetail.semesterName}</h2>
			<ul className={styles.list}>
				{semesterDetail.disciplines.length > 0 ? (
					semesterDetail.disciplines.map((discipline, index) => (
						<li key={index} className={styles.item}>
							<span className={styles.item__name}>{discipline.name}</span>
							<span className={styles.item__count}>{discipline.zet} ЗЕТ</span>
						</li>
					))
				) : (
					<p className={styles.empty}>Семестр пуст.</p>
				)}
			</ul>
			<Form name='form-semester-detail' onSubmit={handleSubmit}>
				<FormField title='Запланировано количество ЗЕТ:'>
					<FormInputNumber
						name='hours'
						value={hours}
						onChange={handleChangeHours}
						placeholder='Введите число ЗЕТ'
					/>
				</FormField>
				<FormField title='Запланировано количество дисциплин (не более):'>
					<FormInputNumber
						name='hours'
						value={disciplineCount}
						onChange={handleChangeDisciplineCount}
						placeholder='Введите число дисциплин'
					/>
				</FormField>
				<FormButtons>
					<Button type='submit' text='Сохранить' width='full' />
				</FormButtons>
			</Form>
		</div>
	);
};
