import { Iou } from '@/types/iou';
import { IouContextProvider, useIousData } from '@/components/provider/Iou';
import { useState } from 'react';

const fetcher = (url: string, method: string, body?: any) =>
	fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(body),
	}).then((r) => r.json());

const useIous = () => {
	const [ious, setIous] = useIousData();
	const [displayMode, setDisplayMode] = useState('');

	const updateIou = async (id: string, newData: Iou) => {
		let newIous = ious.map((iou) => ({ ...iou }));
		let iouIndex = newIous.findIndex((iou) => iou.id === id);
		if (!(iouIndex + 1)) {
			return;
		}
		newIous[iouIndex] = newData;
		setIous(newIous);
	};

	const getHistory = async () => {
		let data = await fetcher(
			'http://localhost:8080/api/v1/iou/history',
			'GET'
		);
		setIous(data);
		setDisplayMode('history');
	};

	const getLending = async () => {
		let data = await fetcher(
			'http://localhost:8080/api/v1/iou/lending',
			'GET'
		);
		setIous(data);
		setDisplayMode('lending');
	};

	const getNotFullFinish = async () => {
		let data = await fetcher(
			'http://localhost:8080/api/v1/iou/not-full-finish',
			'GET'
		);
		setIous(data);
		setDisplayMode('not-full-finish');
	};

	const newIou = async (iou: Iou) => {
		let data = await fetcher(
			'http://localhost:8080/api/v1/iou/new',
			'POST',
			{ iou }
		);
		setIous([...ious, data]);
	};

	const putIou = async (id: string, iou: Iou) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/iou/${id}`,
			'PUT',
			{ iou }
		);
		updateIou(id, data);
	};

	const lendIou = async (id: string) => {
		try {
			let data = await fetcher(
				`http://localhost:8080/api/v1/iou/lend/${id}`,
				'post'
			);
			updateIou(id, data);
		} catch (error) {
			console.error(error);
		}
	};

	const returnIou = async (id: string, iou: Iou) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/iou/return`,
			'post',
			{ iou }
		);
		setIous(ious.filter((iou) => iou.id !== id));
	};

	const deleteIou = async (id: string) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/iou/${id}`,
			'DELETE'
		);
		setIous(ious.filter((iou) => iou.id !== id));
	};

	return {
		ious,
		displayMode,
		getHistory,
		getLending,
		getNotFullFinish,
		newIou,
		putIou,
		lendIou,
		returnIou,
		deleteIou,
	};
};

export default useIous;
export { IouContextProvider };
