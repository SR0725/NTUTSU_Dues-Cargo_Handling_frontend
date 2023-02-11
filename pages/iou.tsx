// NOT FINISH!

import AppHeadbar from '@/components/app/Headbar';
import { Breadcrumbs } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import IouCard from '@/components/iou/Card';
import AddCard from '@/components/iou/AddCard';
import { Iou } from 'types/iou';

export default function OtherFee() {
	const [ious, setIous] = useState<Iou[]>([]);
	const [refresh, setRefresh] = useState<number>(0);

	useEffect(() => {
		fetch(`http://localhost:8080/api/v1/iou/lending`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => response.json().then((data) => setIous(data)));
	}, [refresh]);

	return (
		<>
			<AppHeadbar title='借出資產'>
				<Breadcrumbs>
					<a
						href='#'
						className='opacity-60'
					>
						歷史紀錄
					</a>
					<a
						href='#'
						className='opacity-60'
					>
						有缺漏歸還
					</a>
					<a href='#'>借出中</a>
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
			<AddCard setRefresh={setRefresh} />
		</>
	);
}
