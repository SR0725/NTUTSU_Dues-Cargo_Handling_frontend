import Image from 'next/image';
const studentSrc = '/student.png';

export default function StudentCard(props: {
	sid: string;
	studentName: string;
	studentClass: string;
	record: JSX.Element;
	action: JSX.Element;
}) {
	return (
		<div className='px-0 lg:px-2 py-3'>
			<div className='w-fill bg-white rounded-xl w-full h-32 flex justify-between px-4'>
				<div className='bg-[#2196f3] flex justify-center items-center w-28 h-28 -translate-y-4 rounded-2xl drop-shadow-[0_4px_3px_#1976d2]'>
					<Image
						src={studentSrc}
						alt='學生'
						width={96}
						height={96}
					/>
				</div>
				<div className=' flex-grow mt-1 ml-3'>
					<h1 className='font-bold text-2xl bg-blue-gray-100 text-blue-gray-900 px-4 rounded-full mt-1'>
						{props.sid}
					</h1>
					<h2 className='ml-2 mt-1'>
						<span className='font-bold text-xl'>
							{props.studentName}
						</span>
						<span className='ml-4 text-sm'>
							{props.studentClass}
						</span>
					</h2>
					<h2 className='ml-2 flex mt-3 justify-end'>
						{props.record}
						{props.action}
					</h2>
				</div>
			</div>
		</div>
	);
}
