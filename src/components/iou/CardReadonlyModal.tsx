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

function TimeDisplay({ time }: { time: number }) {
	let transformTime = new Date(time);
	let year = transformTime.getFullYear() - 1911;
	let month = (transformTime.getMonth() + 1).toString().padStart(2, '0');
	let date = transformTime.getDate().toString().padStart(2, '0');
	let hour = transformTime.getHours().toString().padStart(2, '0');
	let minute = transformTime.getMinutes().toString().padStart(2, '0');
	let second = transformTime.getSeconds().toString().padStart(2, '0');

	return (
		<div className=' bg-blue-gray-100 w-24 text-center rounded-md'>
			{year}/{month}/{date} {hour}:{minute}:{second}
		</div>
	);
}

interface CardModalProps {
	title: string;
	button: React.ReactNode;
	iou: Iou;
}

const CardModal = ({ title, button, iou }: CardModalProps) => {
	const { borrower, items, returnItems, lendTime, returnTime, remark } = iou;
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

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
					<h1 className='text-2xl font-bold border-b-[1px] border-gray-600 w-full px-2 py-1'>
						借用社團名稱:{borrower}
					</h1>
					<div>
						<h2 className='text-xl border-b-[1px] border-gray-500 w-full px-2 py-1'>
							借出物品
						</h2>
						<ul className='flex flex-col'>
							{items.map((item) => (
								<li
									key={item.name}
									className='flex flex-row'
								>
									<span className='w-1/2'>{item.name}</span>
									<span className='w-1/2'>{item.amount}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h2 className='text-xl border-b-[1px] border-gray-500 w-full px-2 py-1'>
							實際歸還物品
						</h2>
						<ul className='flex flex-col'>
							{returnItems.map((item) => (
								<li
									key={item.name}
									className='flex flex-row'
								>
									<span className='w-1/2'>{item.name}</span>
									<span className='w-1/2'>{item.amount}</span>
								</li>
							))}
						</ul>
					</div>
					<div className='flex flex-col'>
						<h3>借出時間</h3>
						<TimeDisplay time={lendTime} />
					</div>
					<span className='flex flex-col'>
						<h3>歸還時間</h3>
						<TimeDisplay time={returnTime} />
					</span>
					<div>
						<h2 className='text-xl border-b-[1px] border-gray-500 w-full px-2 py-1'>
							備註
						</h2>
						{remark}
					</div>
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
				</DialogFooter>
			</Dialog>
		</>
	);
};

export default CardModal;
