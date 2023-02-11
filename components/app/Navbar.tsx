import { useState, useEffect } from 'react';
import { MdOutlineAccountBox } from 'react-icons/md';
import { RxCodesandboxLogo } from 'react-icons/rx';
import { SiGoogleanalytics } from 'react-icons/si';
import { VscHistory, VscSettingsGear } from 'react-icons/vsc';
import Link from 'next/link';

export default function Navbar() {
	const [selectedTab, setSelectedTab] = useState('學生會費');
	const tabList = [
		{
			name: '學生會費',
			pageId: 'UnionFee',
			icon: (
				<MdOutlineAccountBox className='h-[25px] w-[25px] inline-block mb-1' />
			),
		},
		{
			name: '借出資產',
			pageId: 'iou',
			icon: (
				<RxCodesandboxLogo className='h-[25px] w-[25px] inline-block mb-1' />
			),
		},
		{
			name: '歷史操作',
			pageId: 'History',
			icon: (
				<VscHistory className='h-[25px] w-[25px] inline-block mb-1' />
			),
		},
		{
			name: '設定',
			pageId: 'Setting',
			icon: (
				<VscSettingsGear className='h-[25px] w-[25px] inline-block mb-1' />
			),
		},
	];

	return (
		<div className='w-full h-screen'>
			<section className='block fixed inset-x-0 bottom-0 z-10 bg-white shadow'>
				<div className='flex justify-between'>
					{tabList.map((tab) => (
						<Tab
							key={tab.pageId}
							icon={tab.icon}
							selected={selectedTab === tab.pageId}
							handleClick={() => {
								setSelectedTab(tab.pageId);
							}}
							pageId={tab.pageId}
							title={tab.name}
						/>
					))}
				</div>
			</section>
		</div>
	);
}

function Tab(props: {
	icon: JSX.Element;
	title: string;
	selected: boolean;
	handleClick: Function;
	pageId: string;
}) {
	const baseTabClass =
		'transition-all ease-in-out duration-250 w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1 px-0';
	const baseTabTitleClass =
		'transition-all ease-in-out duration-300 tab tab-home block text-teal-500 text-xs translate-y-6';

	const [tabClass, setTabClass] = useState(baseTabClass);
	const [tabTitleClass, setTabTitleClass] = useState(baseTabTitleClass);

	useEffect(() => {
		if (props.selected) {
			setTabClass(
				baseTabClass + ' text-teal-500 bg-teal-50 px-5 translate-y-0'
			);
			setTabTitleClass(baseTabTitleClass + ' translate-y-0');
		} else {
			setTabClass(baseTabClass + ' text-gray-600 translate-y-2');
			setTabTitleClass(baseTabTitleClass + ' translate-y-6');
		}
	}, [props.selected]);

	return (
		<Link
			href={`/${props.pageId}`}
			onClick={() => props.handleClick()}
			className={tabClass}
		>
			{props.icon}
			<span className={tabTitleClass}>{props.title}</span>
		</Link>
	);
}
