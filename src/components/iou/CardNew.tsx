import { AiOutlinePlus } from 'react-icons/ai';
import 'react-datepicker/dist/react-datepicker.css';
import getRandomID from '@/utils/getRandomID';
import { Iou, LendStatus } from '@/types/iou';
import useIous from '@/hooks/useIous';
import CardModal from '@/components/iou/CardModal';

const initIou: Iou = {
	id: getRandomID(),
	borrower: '',
	image: '',
	remark: '',
	returnItems: [],
	lendTime: new Date().getTime(),
	returnTime: new Date().getTime(),
	items: [],
	operator: '',
	history: [
		{
			name: '創建',
			time: new Date().getTime(),
		},
	],
	status: '尚未借出' as LendStatus,
};

export default function CardNew() {
	const { newIou } = useIous();

	const handleSendRequest = async (iou: Iou) => {
		newIou(iou);
	};

	return (
		<CardModal
			title={'修改當前借用單'}
			button={
				<button className='fixed bottom-20 right-6 bg-light-blue-400 w-12 md:w-16 h-12 md:h-16 rounded-full flex justify-center items-center text-white text-lg md:text-3xl hover:shadow-2xl focus:shadow-2xl transition-all ease-in-out duration-250 '>
					<AiOutlinePlus />
				</button>
			}
			callback={(iou: Iou) => {
				handleSendRequest(iou);
			}}
			iou={initIou}
		/>
	);
}
