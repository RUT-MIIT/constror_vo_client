export const required = (errorMessage = 'Поле обязательно для заполнения') => ({
	validate: (value: string) => value.length > 0,
	errorMessage,
});

export const minLength = (
	length: number,
	errorMessage = `Минимальная длина: ${length} символов`
) => ({
	validate: (value: string) => value.length >= length,
	errorMessage,
});

export const emailFormat = (
	errorMessage = 'Неверный формат электронной почты'
) => ({
	validate: (value: string) =>
		/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value),
	errorMessage,
});
