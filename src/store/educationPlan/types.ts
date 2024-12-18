export interface IEducationPlanStore {
	disciplinesBasic: IDiscPlan[] | null;
	disciplinesSpec: IDiscPlan[] | null;
	currentDiscipline: IDiscPlan | null;
	currentSemesterId: number | null;
	semesters: ISemesterPlan[] | null;
	loadingData: boolean;
	errorData: string | null;
	isShowModal: {
		addHours: boolean;
		editHours: boolean;
	};
}

export interface IDiscPlan {
	id: number;
	name: string;
	semesters: ISemesterDisc[];
}

export interface IInitialDataResponse {
	message: string;
	op_disciplines: IDiscPlan[];
	pr_disciplines: IDiscPlan[];
	semesters: ISemesterPlan[];
}

export interface ISemesterPlan {
	id: number;
	name: string;
}

export interface ISemesterDisc {
	semester: number;
	zet: number | null;
	control: string;
}

export interface IAddHoursRequest {
	disciplineId: number;
	semester: ISemesterDisc;
}

export interface IRemoveHoursRequest {
	disciplineId: number;
	semester: number;
}

export interface IRemoveHoursResponse {
	message: string;
}
