import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Textarea,
} from '@material-tailwind/react';
import { AiOutlinePlus } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import getRandomID from 'utils/getRandomID';
import { Iou, LendStatus } from '@/model/iou';
import { IouItem } from '@/model/IouItem';

interface AddCardProps {
	setRefresh: React.Dispatch<React.SetStateAction<number>>;
}

export default function AddCard({ setRefresh }: AddCardProps) {
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

	const handleSendRequest = async () => {
		const iou: Iou = {
			id: getRandomID(),
			borrower,
			image: '',
			items: getItemsByContent(content),
			returnItems: [],
			lendTime: lendTime.getTime(),
			returnTime: returnTime.getTime(),
			remark,
			operator: '', // TODO: 從登入資訊取得
			history: [
				{
					name: '創建',
					time: new Date().getTime(),
				},
			],
			status: '尚未借出' as LendStatus,
		};

		let response = await fetch(`http://localhost:8080/api/v1/iou/new`, {
			method: 'post',
			body: JSON.stringify({ iou }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		console.log(response.json());
		setRefresh((prev) => prev + 1);
		handleOpen();
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className='fixed bottom-20 right-6 bg-light-blue-400 w-12 md:w-16 h-12 md:h-16 rounded-full flex justify-center items-center text-white text-lg md:text-3xl hover:shadow-2xl focus:shadow-2xl transition-all ease-in-out duration-250 '
			>
				<AiOutlinePlus />
			</button>
			<Dialog
				open={open}
				handler={handleOpen}
				size='xl'
			>
				<DialogHeader>建立新的借用單</DialogHeader>
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
					<div className='relative flex'>
						<span className='flex flex-col'>
							<h3>借出時間</h3>
							<DatePicker
								selected={lendTime}
								onChange={(date) => setLendTime(date as Date)}
								showTimeSelect
								timeFormat='p'
								timeIntervals={30}
								dateFormat='Pp'
							/>
						</span>
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
					</div>
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
						onClick={handleSendRequest}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	);
}

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
