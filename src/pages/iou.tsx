// NOT FINISH!
import { useEffect } from 'react';
import AppHeadbar from '@/components/app/Headbar';
import { Breadcrumbs } from '@material-tailwind/react';
import React from 'react';
import IouCard from '@/components/iou/Card';
import CardNew from '@/components/iou/CardNew';
import { Iou } from '@/types/iou';
import useIous from '@/hooks/useIous';

export default function OtherFee() {
	const { ious, displayMode, getLending, getHistory, getNotFullFinish } =
		useIous();

	useEffect(() => {
		getLending();
	}, []);

	const breadcrumbs = [
		{
			name: '歷史紀錄',
			id: 'history',
			handleClick: () => getHistory(),
		},
		{
			name: '有缺漏歸還',
			id: 'not-full-finish',
			handleClick: () => getNotFullFinish(),
		},
		{
			name: '借出中',
			id: 'lending',
			handleClick: () => getLending(),
		},
	];

	return (
		<>
			<AppHeadbar title='借出資產'>
				<Breadcrumbs>
					{breadcrumbs.map((breadcrumb) => (
						<a
							key={breadcrumb.name}
							href='#'
							className={
								displayMode !== breadcrumb.id
									? 'opacity-60'
									: ''
							}
							onClick={breadcrumb.handleClick}
						>
							{breadcrumb.name}
						</a>
					))}
				</Breadcrumbs>
			</AppHeadbar>
			<div className='container mx-auto px-4 py-4'>
				<div className='grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden'>
					{ious.map((iou: Iou) => (
						<IouCard
							key={iou.id}
							{...iou}
						/>
					))}
				</div>
			</div>
			<CardNew />
		</>
	);
}
