import { IouItem } from '@/model/IouItem';
import { IouHistory } from '@/model/IouHistory';

/** - 借據
 * @param id - 唯一辨識碼
 * @param borrower - 借入人
 */
export type Iou = {
	id: string;
	borrower: string;
	image: string;
	items: IouItem[];
	returnItems: IouItem[];
	lendTime: number;
	returnTime: number;
	remark: string;
	operator: string;
	history: IouHistory[];
	status: LendStatus;
};

export enum LendStatus {
	'尚未借出' = '尚未借出',
	'正在被借出' = '正在被借出',
	'已經成功歸還' = '已經成功歸還',
	'歸還不完整' = '歸還不完整',
	'撤銷' = '撤銷',
}
