import type { FC } from 'react';

import { Container, Text, List } from '../../../shared/components/Typography';

const items = [
	{
		title: 'Внутренний эксперт',
		text: 'Руководитель образовательной программы и (или) ведущий эксперт университета, основная деятельность которого – преподавание и научные исследования (научно-технический консалтинг)   в предметной области проектируемой образовательной программы. Основное место работы – университет. Разработчик образовательной программы, участвует в создании концептуального проекта по стадиям проектирования. Организует все коммуникации внутри экспертов и валидаторов. Получает от педагогического дизайнера материалы концептуального проекта по стадиям проектирования, и, в коммуникации с внешними экспертами, проводит их экспертизу и определяет окончательную редакцию.',
	},
	{
		title: 'Внешний эксперт',
		text: 'Эксперт в предметной области проектируемой образовательной программы, работник бизнеса: он хорошо знает будущую профессиональную деятельность выпускника образовательной программы и кадровую потребность бизнеса, частью которого является (какой функционал не обеспечен кадрами, какие компетенции дефицитны и т.д.). Основные место работы – компания. Разработчик образовательной программы, участвует в создании концептуального проекта по стадиям проектирования.',
	},
	{
		title: 'Валидатор',
		text: 'Эксперт в предметной области проектируемой образовательной программы. Квалификация как у внешнего эксперта. Не участвует в проектировании образовательной программы по стадиям проектирования, а получает на экспертизу готовый концептуальный проект, разработанный педагогическими дизайнерами и экспертами. Результаты валидации рассматриваются экспертами и либо принимаются, либо мотивированно отклоняются.',
	},
	{
		title: 'Специалист по учебно-методической работе',
		text: 'Работник университета, уполномоченный устанавливать ограничения на параметры учебного плана (например, минимальное и максимальное количество дисциплин, ЗЕТ и др.), которыми необходимо руководствоваться при проектировании.',
	},
];

export const ParticipantsInfoDetail: FC = () => {
	return (
		<Container>
			<Text text='Сформируйте команду проектирования согласно предложенной ролевой модели. В каждой ролевой позиции может быть одни или несколько человек.'></Text>
			<List title='Описание ролевых позиций: ' items={items} />
		</Container>
	);
};
