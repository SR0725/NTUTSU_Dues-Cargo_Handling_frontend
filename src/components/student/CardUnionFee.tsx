import { Button, Chip } from '@material-tailwind/react';
import CardBody from '@/components/student/CardBody';
import { Fee } from '@/types/fee';
import useStudents from '@/hooks/useStudents';

export default function StudentCardUnionFee(props: {
	sid: string;
	studentClass: string;
	studentName: string;
	unionsFeeRecords: Fee[];
}) {
	return (
		<CardBody
			sid={props.sid}
			studentClass={props.studentClass}
			studentName={props.studentName}
			record={<FeeRecord unionsFeeRecords={props.unionsFeeRecords} />}
			action={
				<FeeAddButton
					unionsFeeRecords={props.unionsFeeRecords}
					sid={props.sid}
				/>
			}
		/>
	);
}

function FeeRecord(props: { unionsFeeRecords: Fee[] }) {
	if (props.unionsFeeRecords.length) {
		return (
			<Chip
				color='teal'
				variant='gradient'
				value='已經繳過會費'
			/>
		);
	}
	return (
		<Chip
			color='cyan'
			variant='gradient'
			value='沒有繳費紀錄'
		/>
	);
}

function FeeAddButton(props: { unionsFeeRecords: Fee[]; sid: string }) {
	const { addUnionFee, deleteUnionFee } = useStudents();

	if (props.unionsFeeRecords.length) {
		return (
			<Button
				color='red'
				size='sm'
				className=' rounded-full ml-2'
				onClick={() => {
					deleteUnionFee(props.sid);
				}}
			>
				移除繳費
			</Button>
		);
	}
	return (
		<Button
			color='green'
			size='sm'
			className=' rounded-full ml-2'
			onClick={() => {
				addUnionFee(props.sid);
			}}
		>
			新增繳費
		</Button>
	);
}
