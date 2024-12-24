import { useState, useEffect, FC } from 'react';
import { useSelector } from '../../../store/store';

import styles from '../styles/semester-detail.module.scss';

export const SemesterDetail: FC = () => {
	const { semesters, currentSemesterId, disciplinesBasic, disciplinesSpec } =
		useSelector((state) => state.eduPlan);

	const [semesterDetail, setSemesterDetail] = useState<{
		semesterName: string;
		disciplines: { name: string; zet: number }[];
	}>({
		semesterName: '',
		disciplines: [],
	});

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
					discipline.semesters.forEach((semesterData) => {
						if (semesterData.semester === currentSemesterId) {
							relatedDisciplines.push({
								name: discipline.name,
								zet: semesterData.zet || 0, // количество ЗЕТ
							});
						}
					});
				});

				// Добавляем дисциплины в определенные семестры
				const semesterUpdates = [
					{ index: 0, name: 'Дисциплины АБП', zet: 17 },
					{ index: 1, name: 'Дисциплины АБП', zet: 11 },
					{ index: 3, name: 'Учебная практика', zet: 3 },
					{ index: 5, name: 'Производственная практика', zet: 6 },
					{ index: 7, name: 'Преддипломная практика', zet: 12 },
					{ index: 7, name: 'ВКР', zet: 21 },
				];

				// Обновляем массив дисциплин, добавляя их в нужные семестры
				semesterUpdates.forEach(({ index, name, zet }) => {
					const semesterId = semesters[index]?.id;
					if (semesterId === currentSemesterId) {
						relatedDisciplines.push({ name, zet });
					}
				});

				// Обновим состояние с деталями семестра
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
		</div>
	);
};
