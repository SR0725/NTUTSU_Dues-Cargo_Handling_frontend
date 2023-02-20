import { Navbar, Typography } from '@material-tailwind/react';

export default function Headbar(props: {
	title: string;
	children?: JSX.Element;
}) {
	return (
		<Navbar className='mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4'>
			<div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
				<Typography
					as='a'
					href='#'
					variant='small'
					className='mr-4 cursor-pointer py-1.5 font-normal'
				>
					<span>{props.title}</span>
				</Typography>
				{props.children}
			</div>
		</Navbar>
	);
}
