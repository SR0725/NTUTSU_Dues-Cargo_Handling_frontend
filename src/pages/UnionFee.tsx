import AppHeadbar from '@/components/app/Headbar';
import { Input } from '@material-tailwind/react';
import StudentCardUnionFee from '@/components/student/CardUnionFee';
import React, { useState } from 'react';
import { Student } from '@/types/student';
import { Button } from '@material-tailwind/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useStudents from '@/hooks/useStudents';

export default function UnionFee() {
	const { students } = useStudents();

	const getSlideClass = (index: number) => {
		if (index > 24) {
			return `list-slide-24`;
		}
		if (window.matchMedia('(max-width: 1024px)').matches) {
			return `list-slide-${index % 12}`;
		}
		return `list-slide-${Math.floor(index / 2) % 12}`;
	};

	return (
		<>
			<AppHeadbar title='學生會費' />
			<div className='container mx-auto px-4 py-4'>
				<SearchBar />
				<div className='w-full h-8'></div>
				<TransitionGroup
					component='div'
					className='grid grid-cols-1 lg:grid-cols-2 overflow-x-hidden'
				>
					{students.map((student: Student, index: number) => (
						<CSSTransition
							timeout={600}
							classNames={getSlideClass(index)}
							unmountOnExit
							appear={true}
							key={index + student.id}
						>
							<StudentCardUnionFee
								sid={student.id}
								key={student.id}
								studentClass={student.class}
								studentName={student.name}
								unionsFeeRecords={student.unionsFeeRecords}
							/>
						</CSSTransition>
					))}
				</TransitionGroup>
			</div>
		</>
	);
}

function SearchBar() {
	const { search } = useStudents();

	const [keyword, setKeyword] = useState('');

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleClick = () => {
		handleSearch();
	};

	const handleSearch = async () => {
		search(keyword);
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.target.value);
	};

	return (
		<div className='flex'>
			<Input
				label='查詢關鍵字(學號、名字...)'
				className='bg-white'
				onKeyDown={handleKeyDown}
				onChange={handleInput}
			/>
			<Button
				size='sm'
				className='ml-2'
				variant='outlined'
				onClick={handleClick}
			>
				Search
			</Button>
		</div>
	);
}
