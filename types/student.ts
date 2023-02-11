import { Fee } from 'types/fee';

export type Student = {
	id: string;
	name: string;
	class: string;
	unionsFeeRecords: Fee[];
	otherRecords: Fee[];
};
