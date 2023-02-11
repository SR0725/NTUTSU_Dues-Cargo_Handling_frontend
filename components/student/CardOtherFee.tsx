import { Button } from '@material-tailwind/react';
import CardBody from '@/components/student/CardBody';
import CardOtherFeeAddButton from '@/components/student/CardOtherFeeAddButton';
import CardOtherFeeRecord from '@/components/student/CardOtherFeeRecord';

export default function StudentCardUnionFee(props: {
	sid: string;
	studentClass: string;
	studentName: string;
}) {
	return (
		<CardBody
			sid={props.sid}
			studentClass={props.studentClass}
			studentName={props.studentName}
			record={<CardOtherFeeRecord />}
			action={<CardOtherFeeAddButton />}
		/>
	);
}
