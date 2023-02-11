import { Button, Chip } from '@material-tailwind/react';
import CardBody from '@/components/student/CardBody';
import { Fee } from 'types/fee';
import { Student } from 'types/student';

export default function StudentCardUnionFee(props: {
	sid: string;
	studentClass: string;
	studentName: string;
	unionsFeeRecords: Fee[];
	updateStudent: Function;
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
					updateStudent={props.updateStudent}
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

function FeeAddButton(props: {
	unionsFeeRecords: Fee[];
	sid: string;
	updateStudent: Function;
}) {
	const addUnionFee = async () => {
		let response = await fetch(
			`http://localhost:8080/api/v1/student/union-fee/${props.sid}`,
			{
				method: 'POST',
			}
		);
		let newStudent = await (response.json() as Promise<Student>);
		props.updateStudent(props.sid, newStudent);
	};

	const deleteUnionFee = async () => {
		let response = await fetch(
			`http://localhost:8080/api/v1/student/union-fee/${props.sid}`,
			{
				method: 'DELETE',
			}
		);
		let newStudent = await (response.json() as Promise<Student>);
		props.updateStudent(props.sid, newStudent);
	};

	if (props.unionsFeeRecords.length) {
		return (
			<Button
				color='red'
				size='sm'
				className=' rounded-full ml-2'
				onClick={deleteUnionFee}
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
			onClick={addUnionFee}
		>
			新增繳費
		</Button>
	);
}
