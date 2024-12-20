import type { FC } from 'react';
import type { IOrgChartProps } from '../types/types';

import { useState, useMemo } from 'react';

import { Modal } from '../../../shared/components/Modal/ui/modal';
import { Tabs } from '../../../shared/components/Tabs/ui/tabs';
import { TextTemplate } from '../../../features/TextTemplate/ui/text-template';
import { ContentTemplate } from '../../../features/ContentTemplate/ui/content-template';

import { ReconstructionTree } from './reconstruction-tree';
import { DisciplineTree } from './discipline-tree';

export const OrgChart: FC<IOrgChartProps> = ({
	nodes,
	layout = 'normal',
	type = 'default',
}) => {
	const [currentNode, setCurrentNode] = useState<any | null>(null);

	const handleNodeClick = (node: unknown) => {
		setCurrentNode(node);
	};

	const closeModal = () => {
		setCurrentNode(null);
	};

	const renderTabs = (node: any) => {
		switch (node.type) {
			case 'stage':
				return [
					{
						label: 'Описание этапа',
						content: <TextTemplate text={node.description || ''} />,
					},
				];

			case 'product':
				return [
					{
						label: 'Нормативные акты',
						content: node.nsis.map((item: string, i: number) => (
							<ContentTemplate key={i} type='nsi' text={item} id={i + 1} />
						)),
					},
					{
						label: 'Описание продукта',
						content: <TextTemplate text={node.description || ''} />,
					},
				];

			case 'process':
				return [
					{
						label: 'Описание процесса',
						content: <TextTemplate text={node.description || ''} />,
					},
					{
						label: 'Результат деятельности',
						content: <TextTemplate text={node.result || ''} />,
					},
				];

			case 'discipline':
				return [
					{
						label: 'Описание дисциплины',
						content: <TextTemplate text={node.description || ''} />,
					},
					{
						label: 'Практическое задание',
						content: <TextTemplate text={node.practice || ''} />,
					},
				];

			default:
				return [
					{
						label: 'Нет данных',
						content: <div>Нет информации для данного типа</div>,
					},
				];
		}
	};

	const memoizedTree = useMemo(
		() =>
			type === 'default' ? (
				<ReconstructionTree
					onClickNode={handleNodeClick}
					layout={layout}
					nodes={nodes.map((elem) => ({
						...elem,
						tags: [elem.type],
					}))}
				/>
			) : (
				<DisciplineTree
					onClickNode={handleNodeClick}
					layout={layout}
					nodes={nodes.map((elem) => ({
						...elem,
						tags: [elem.type],
					}))}
				/>
			),
		[nodes]
	);

	return (
		<div className='org-chart'>
			<div className='chart-spyrale'></div>
			<div className='tree-container' style={{ height: '100%' }}>
				{memoizedTree}
			</div>
			{currentNode && (
				<Modal
					isOpen={currentNode !== null}
					onClose={closeModal}
					title={currentNode.name}
					modalWidth='large'>
					<Tabs tabs={renderTabs(currentNode)} />
				</Modal>
			)}
		</div>
	);
};
