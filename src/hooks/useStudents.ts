import { Student } from '@/types/student';

import {
	useStudentsData,
	StudentContextProvider,
} from '@/components/provider/Students.tsx';

const fetcher = (url: string, method: string) =>
	fetch(url, { method }).then((r) => r.json());

const useStudents = () => {
	const [students, setStudents] = useStudentsData();

	const updateStudent = (id: string, newData: Student) => {
		let newStudents = students.map((student) => ({
			...student,
			unionsFeeRecords: [...student.unionsFeeRecords],
			otherRecords: [...student.otherRecords],
		}));

		let student = newStudents.find((student) => student.id === id);
		if (!student) {
			return;
		}
		student.unionsFeeRecords = newData.unionsFeeRecords;
		setStudents(newStudents);
	};

	const search = async (query: string) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/student/search/${query}`,
			'GET'
		);
		setStudents(data);
	};

	const addUnionFee = async (id: string) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/student/union-fee/${id}`,
			'POST'
		);

		updateStudent(id, data);
	};

	const deleteUnionFee = async (id: string) => {
		let data = await fetcher(
			`http://localhost:8080/api/v1/student/union-fee/${id}`,
			'DELETE'
		);

		updateStudent(id, data);
	};

	return { students, search, addUnionFee, deleteUnionFee };
};

export { StudentContextProvider };
export default useStudents;
