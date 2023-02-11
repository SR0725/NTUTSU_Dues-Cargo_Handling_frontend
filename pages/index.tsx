import AppHeadbar from '@/components/app/Headbar';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { login, logout } from 'store/accountSlice';

export default function Home() {
	const account = useAppSelector((state) => state.account);
	const dispatch = useAppDispatch();

	return (
		<>
			<AppHeadbar title='北科學生會金流' />
		</>
	);
}
