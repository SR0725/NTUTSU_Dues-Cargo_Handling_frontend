// NOT FINISH!

import Image from 'next/image';
import { RiImageAddLine } from 'react-icons/ri';
import { Iou } from '@/types/iou';
import { Button } from '@material-tailwind/react';
import useIous from '@/hooks/useIous';
import CardModal from './CardModal';
import CardReadonlyModal from './CardReadonlyModal';
import 'react-datepicker/dist/react-datepicker.css';

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

function TimeDisplay({ time }: { time: number }) {
	let transformTime = new Date(time);
	let year = transformTime.getFullYear() - 1911;
	let month = (transformTime.getMonth() + 1).toString().padStart(2, '0');
	let date = transformTime.getDate().toString().padStart(2, '0');

	return (
		<div className=' bg-blue-gray-100 w-24 text-center rounded-md'>
			{year}/{month}/{date}
		</div>
	);
}

interface ReturnCheckProps {
	iou: Iou;
	children: React.ReactNode;
}
function ReturnCheckButton({ iou, children }: ReturnCheckProps) {
	const { returnIou } = useIous();

	const handleReturn = (iou: Iou) => {
		returnIou(iou.id, iou);
	};

	return (
		<CardModal
			title={'修改當前借用單'}
			button={children}
			callback={(iou: Iou) => {
				handleReturn(iou);
			}}
			iou={iou}
		/>
	);
}

function StatusButton(iou: Iou) {
	const { id, status } = iou;
	const { putIou, lendIou, returnIou, deleteIou } = useIous();
	if (status === '尚未借出') {
		return (
			<span>
				<Button
					className='ml-4'
					size='sm'
					color='red'
					onClick={() => {
						deleteIou(id);
					}}
				>
					刪除
				</Button>

				<Button
					className='ml-4'
					size='sm'
					onClick={() => {
						lendIou(id);
					}}
				>
					確認借出
				</Button>
			</span>
		);
	}
	if (status === '正在被借出') {
		return (
			<span>
				<Button
					className='ml-4'
					size='sm'
					color='red'
					onClick={() => {
						deleteIou(id);
					}}
				>
					刪除
				</Button>

				<ReturnCheckButton iou={iou}>
					<Button
						className='ml-4'
						size='sm'
					>
						確認歸還
					</Button>
				</ReturnCheckButton>
			</span>
		);
	}
	return <></>;
}

const statusColor = {
	尚未借出: 'bg-white',
	正在被借出: 'bg-green-100',
	已經成功歸還: 'bg-gray-100',
	歸還不完整: 'bg-yellow-100',
	撤銷: 'bg-red-100',
};
export default function StudentCard(iou: Iou) {
	const { id, borrower, items, lendTime, returnTime, image, status } = iou;
	const { putIou } = useIous();

	const handleUpdate = (iou: Iou) => {
		putIou(id, iou);
	};

	return (
		<div className='px-0 lg:px-2 py-3 relative'>
			<div
				className={
					'w-fill rounded-xl w-full h-40 flex justify-between px-4 ' +
					statusColor[status]
				}
			>
				<ImageFramework image={image} />
				<div className=' flex-grow mt-1 ml-3'>
					<h1 className='text-xl '>{borrower}</h1>
					<hr className='my-1' />
					<p className='w-full text-md break-all'>
						想要借用{' '}
						{items.map(({ name, amount }, index) => (
							<span key={index}>
								{name}x{amount}{' '}
							</span>
						))}
						等物品{' '}
						{status === '已經成功歸還' ||
						status === '歸還不完整' ||
						status === '撤銷' ? (
							<CardReadonlyModal
								title={'查看借用單'}
								button={
									<span className=' text-blue-600 cursor-pointer'>
										歷史紀錄
									</span>
								}
								iou={iou}
							/>
						) : (
							<CardModal
								title={'修改當前借用單'}
								button={
									<span className=' text-blue-500 cursor-pointer'>
										查看詳細
									</span>
								}
								callback={(iou: Iou) => {
									handleUpdate(iou);
								}}
								iou={iou}
							/>
						)}
					</p>
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
							<StatusButton {...iou} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
