import type { IEducationForm, IDisciplineForm } from './types';

export const educationForms: IEducationForm[] = [
	{ id: 1, name: 'Очная' },
	{ id: 2, name: 'Очно-заочная' },
	{ id: 3, name: 'Заочная' },
];

export const disciplineForms: IDisciplineForm[] = [
	{ id: 1, name: 'Зачёт (Зачет)' },
	{ id: 2, name: 'Зачёт с оценкой (ЗаО)' },
	{ id: 3, name: 'Экзамен (Экз)' },
	{ id: 4, name: 'Зачёт, курсовая работа (За КР)' },
	{ id: 5, name: 'Зачёт с оценкой, курсовая работа (ЗаО КР)' },
	{ id: 6, name: 'Экзамен, курсовая работа (Эк КР)' },
];
