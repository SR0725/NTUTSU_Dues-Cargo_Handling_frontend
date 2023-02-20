import {
	useState,
	createContext,
	useContext,
	FC,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import { Student } from '@/types/student';

type StudentsData = [
	students: Student[],
	setStudents: Dispatch<SetStateAction<Student[]>>
];

const studentsData = createContext<StudentsData>([[], () => {}]);

const StudentContextProvider: FC<{
	readonly children: ReactNode;
}> = ({ children }) => {
	const [students, setStudents] = useState<Student[]>([]);

	return (
		<studentsData.Provider value={[students, setStudents]}>
			{children}
		</studentsData.Provider>
	);
};

const useStudentsData = () => useContext(studentsData);

export { StudentContextProvider, useStudentsData };
