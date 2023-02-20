import React, { useState, useEffect } from 'react';
import { Iou } from '@/types/iou';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Textarea,
} from '@material-tailwind/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IouItem } from '@/types/IouItem';

const getItemsByContent = (content: string): IouItem[] => {
	// 以空格區分每一個物品，使用星字號*來表示物品數量
	return content.split('\n').map((item) => {
		const [name, amount] = item.split('*');
		return {
			name,
			amount: Number(amount),
		};
	});
};

const getContentByItems = (iouItems: IouItem[]): string => {
	return iouItems.map(({ name, amount }) => `${name}*${amount}`).join('\n');
};

interface CardModalProps {
	title: string;
	button: React.ReactNode;
	callback: (iou: Iou) => void;
	iou: Iou;
}

const CardModal = ({ title, button, callback, iou }: CardModalProps) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	const [borrower, setBorrower] = useState<string>(''); // 借用社團名稱
	const [remark, setRemark] = useState<string>(''); // 借用備註
	const [content, setContent] = useState<string>(''); // 借用內容
	const [lendTime, setLendTime] = useState<Date>(new Date()); // 借出時間
	const [returnTime, setReturnTime] = useState<Date>(new Date()); // 歸還時間

	const handleBorrower = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBorrower(e.target.value);
	};

	const handleRemark = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setRemark(e.target.value);
	};

	const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const handleUpdate = () => {
		callback({
			id: iou.id,
			borrower,
			image: iou.image,
			remark,
			returnItems: iou.returnItems,
			lendTime: lendTime.getTime(),
			returnTime: returnTime.getTime(),
			items: getItemsByContent(content),
			operator: iou.operator,
			history: iou.history,
			status: iou.status,
		});
		handleOpen();
	};

	useEffect(() => {
		setBorrower(iou.borrower);
		setRemark(iou.remark);
		setContent(getContentByItems(iou.items));
		setLendTime(new Date(iou.lendTime));
		setReturnTime(new Date(iou.returnTime));
	}, []);

	return (
		<>
			<a onClick={handleOpen}>{button}</a>
			<Dialog
				open={open}
				handler={handleOpen}
				size='xl'
			>
				<DialogHeader>{title}</DialogHeader>
				<DialogBody divider>
					<Input
						variant='standard'
						label='借用社團名稱'
						value={borrower}
						onChange={handleBorrower}
					/>
					<Textarea
						variant='static'
						label='借用內容'
						placeholder='輸入格式 [物品1]*[數量]...  以換行區分每一個物品，使用星字號*來表示物品數量'
						value={content}
						onChange={handleContent}
					/>
					<div className='flex flex-col'>
						<h3>借出時間</h3>
						<DatePicker
							selected={lendTime}
							onChange={(date) => setLendTime(date as Date)}
							showTimeSelect
							timeFormat='p'
							timeIntervals={30}
							dateFormat='Pp'
						/>
					</div>
					<span className='flex flex-col'>
						<h3>歸還時間</h3>
						<DatePicker
							selected={returnTime}
							onChange={(date) => setReturnTime(date as Date)}
							showTimeSelect
							timeFormat='p'
							timeIntervals={30}
							dateFormat='Pp'
						/>
					</span>
					<Textarea
						variant='standard'
						label='備註'
						onChange={handleRemark}
						value={remark}
					/>
				</DialogBody>
				<DialogFooter>
					<Button
						variant='text'
						color='red'
						onClick={handleOpen}
						className='mr-1'
					>
						<span>Cancel</span>
					</Button>
					<Button
						variant='gradient'
						color='green'
						onClick={handleUpdate}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default CardModal;
