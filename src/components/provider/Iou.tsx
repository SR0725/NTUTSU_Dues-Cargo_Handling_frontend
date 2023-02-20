import {
	useState,
	createContext,
	useContext,
	FC,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import { Iou } from '@/types/iou';

type IoutsData = [ious: Iou[], setIous: Dispatch<SetStateAction<Iou[]>>];

const ioutsData = createContext<IoutsData>([[], () => {}]);

const IouContextProvider: FC<{
	readonly children: ReactNode;
}> = ({ children }) => {
	const [ious, setIous] = useState<Iou[]>([]);

	return (
		<ioutsData.Provider value={[ious, setIous]}>
			{children}
		</ioutsData.Provider>
	);
};

const useIousData = () => useContext(ioutsData);

export { IouContextProvider, useIousData };
