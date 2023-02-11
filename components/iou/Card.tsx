import Image from 'next/image';
import React, { useState } from 'react';
import { RiImageAddLine } from 'react-icons/ri';
import { Iou } from '@/model/iou';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
	Textarea,
} from '@material-tailwind/react';

export default function StudentCard({
	borrower,
	items,
	lendTime,
	returnTime,
	image,
}: Iou) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(!open);

	return (
		<div className='px-0 lg:px-2 py-3 relative'>
			<div className='w-fill bg-white rounded-xl w-full h-40 flex justify-between px-4'>
				<ImageFramework image={image} />
				<div className=' flex-grow mt-1 ml-3'>
					<h1 className='text-xl '>{borrower}</h1>
					<hr className='my-1' />
					<span className='text-md break-all w-4'>
						想要借用{' '}
						{items.map(({ name, amount }) => (
							<>
								{name}x{amount}
							</>
						))}{' '}
						等物品
					</span>
					<span
						className=' text-blue-500 cursor-pointer absolute'
						onClick={handleOpen}
					>
						查看詳細
					</span>
					<div className='absolute bottom-6 right-4'>
						<div className='flex justify-end items-end'>
							<h2 className='text-sm flex'>
								<span>
									借出時間：
									<TimeDisplay time={lendTime} />
								</span>
								<span className='ml-4'>
									歸還時間：
									<TimeDisplay time={returnTime} />
								</span>
							</h2>
							<Button
								className='ml-4'
								size='sm'
							>
								確認借出
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function ImageFramework({ image }: { image: string }) {
	return (
		<div className='bg-gradient-to-r from-cyan-500 to-blue-500 flex justify-center items-center w-28 h-28 -translate-y-4 rounded-2xl drop-shadow-[0_4px_3px_#1976d2]'>
			{image ? (
				<Image
					src={image}
					alt='學生'
					width={96}
					height={96}
				/>
			) : (
				<div className=' text-3xl text-white '>
					<RiImageAddLine />
				</div>
			)}
		</div>
	);
}

function TimeDisplay(props: { time: number }) {
	let transformTime = new Date(props.time);
	let year = transformTime.getFullYear() - 1911;
	let month = (transformTime.getMonth() + 1).toString().padStart(2, '0');
	let date = transformTime.getDate().toString().padStart(2, '0');

	return (
		<div className=' bg-blue-gray-100 w-24 text-center rounded-md'>
			{year}/{month}/{date}
		</div>
	);
}
