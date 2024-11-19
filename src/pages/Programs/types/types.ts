import type { IEducationDirection } from '../../../store/catalog/types';

export interface IAddProgramValues {
	profile: string;
}

export interface IAddProgramFormProps {
	directions: IEducationDirection[];
}
