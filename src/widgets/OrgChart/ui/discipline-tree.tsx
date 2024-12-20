import type { FC } from 'react';
import type { ITreeProps } from '../types/types';

import { useEffect, useRef } from 'react';
import OrgChart from '@balkangraph/orgchart.js';

import '../styles/org-chart.css';

OrgChart.templates.ana.plus = `<circle cx="15" cy="15" r="15" fill="#ffffff"></circle>
    <text text-anchor="middle" style="font-size: 16px;cursor:pointer;" fill="#041A76" x="15" y="20">{collapsed-children-count}</text>`;

OrgChart.templates.ana.minus = `<circle cx="15" cy="15" r="15" fill="#ffffff"></circle>
<text text-anchor="middle" style="font-size: 16px;cursor:pointer;" fill="#041A76" x="15" y="18">—</text>`;

OrgChart.templates.myTemplate = Object.assign({}, OrgChart.templates.ana);
OrgChart.templates.myTemplate.field_0 =
	'<text data-width="213" data-text-overflow="multiline-3" style="font-size: 18px;" fill="#757575" x="12" y="60" text-anchor="left" class="field_0">{val}</text>';
OrgChart.templates.myTemplate.field_1 = `
  <g>
    <rect x="8" y="8" width="100" height="24" fill="#e5e5e5" rx="5" ry="5"></rect>
    <text data-width="160" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#757575" x="12" y="25" text-anchor="left" class="field_1 field_tag">{val}</text>
  </g>
`;
OrgChart.templates.myTemplate.field_2 =
	'<text data-width="54" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#757575" x="80" y="25" text-anchor="left" class="field_1">{val}</text>';
OrgChart.templates.myTemplate.node =
	'<rect x="0" y="0" height="{h}" width="{w}" fill="#5d87ff" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>';

OrgChart.templates.productDisc = Object.assign(
	{},
	OrgChart.templates.myTemplate
);
OrgChart.templates.productDisc.node =
	'<rect x="0" y="0" height="{h}" width="{w}" fill="#041A76" rx="5" ry="5"></rect>';
OrgChart.templates.productDisc.field_1 = `
  <g>
    <rect x="8" y="8" width="86" height="24" fill="#ffffff" rx="5" ry="5"></rect>
    <text data-width="160" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#757575" x="12" y="25" text-anchor="left" class="field_tag_product">{val}</text>
  </g>
`;

OrgChart.templates.stageDisc = Object.assign({}, OrgChart.templates.myTemplate);
OrgChart.templates.stageDisc.node =
	'<rect x="0" y="0" height="{h}" width="{w}" fill="#EA0A2A" rx="5" ry="5"></rect>';
OrgChart.templates.stageDisc.field_1 = `
  <g>
    <rect x="8" y="8" width="60" height="24" fill="#ffffff" rx="5" ry="5"></rect>
    <text data-width="160" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#757575" x="12" y="25" text-anchor="left" class="field_tag_stage-disc">{val}</text>
  </g>
`;
OrgChart.templates.stageDisc.field_2 =
	'<text data-width="54" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#757575" x="54" y="25" text-anchor="left" class="field_tag_stage-disc">{val}</text>';

OrgChart.templates.processDisc = Object.assign(
	{},
	OrgChart.templates.myTemplate
);
OrgChart.templates.processDisc.node =
	'<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" rx="5" ry="5"></rect>';
OrgChart.templates.processDisc.field_0 =
	'<text data-width="213" data-text-overflow="multiline-3" style="font-size: 18px;" fill="#041A76" x="12" y="60" text-anchor="left" class="field_0_process">{val}</text>';
OrgChart.templates.processDisc.field_1 = `
  <g>
    <rect x="8" y="8" width="100" height="24" fill="#041A76" rx="5" ry="5"></rect>
    <text data-width="160" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#ffffff" x="12" y="25" text-anchor="left" class="field_tag_process">{val}</text>
  </g>
`;
OrgChart.templates.processDisc.field_2 =
	'<text data-width="54" data-text-overflow="ellipsis" style="font-size: 16px;" fill="#ffffff" x="80" y="25" text-anchor="left" class="field_tag_process">{val}</text>';

OrgChart.templates.group.node =
	'<rect x="0" y="0" height="{h}" width="{w}" fill="#FEECEC" rx="5" ry="5"></rect>';
OrgChart.templates.group.field_0 =
	'<text data-width="256" data-text-overflow="multiline-3-ellipsis" style="font-size: 16px;" fill="#041A76" x="20" y="25" text-anchor="left" class="field_disc">{val}</text>';

OrgChart.CLINK_CURVE = -1;

{
	/*

	OrgChart.clinkTemplates.orange.defs =
	'<marker id="arrowOrange" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6"' +
	'orient="auto-start-reverse"><path fill="#EA0A2A" d="M 0 0 L 10 5 L 0 10 z" />' +
	'</marker>' +
	'<marker id="dotOrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="1" markerHeight="1"> ' +
	'<circle cx="5" cy="5" r="5" fill="#EA0A2A" />' +
	'</marker>';

	OrgChart.clinkTemplates.orange.link =
	'<path marker-start="url(#dotOrange)" marker-end="url(#arrowOrange)" stroke="#EA0A2A" stroke-width="3" ' +
	'fill="none" d="{d}" />';
	*/
}

OrgChart.templates.group.padding = [72, 20, 20, 20];

export const DisciplineTree: FC<ITreeProps> = ({
	onClickNode,
	layout,
	nodes,
}) => {
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (divRef.current) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const chart = new OrgChart(divRef.current, {
				nodes,
				nodeMouseClick: OrgChart.action.none,
				lazyLoading: false,
				template: 'myTemplate',
				layout: layout === 'mixed' ? OrgChart.mixed : OrgChart.normal,
				scaleInitial: 0.7,
				enableSearch: false,
				zoom: {
					speed: 30,
					smooth: 10,
				},
				nodeBinding: {
					field_0: 'name',
					field_1: 'title',
					field_2: 'position',
				},
				anim: { func: OrgChart.anim.outPow, duration: 1000 },
				collapse: { level: 1, allChildren: true },
				tags: {
					// eslint-disable-next-line prettier/prettier
					'product': {
						template: 'productDisc',
						subTreeConfig: {
							orientation: OrgChart.orientation.bottom,
						},
					},
					// eslint-disable-next-line prettier/prettier
					'discipline': {
						template: 'group',
						subTreeConfig: {
							layout: OrgChart.mixed,
						},
					},
					// eslint-disable-next-line prettier/prettier
					'stage': {
						template: 'stageDisc',
					},
					// eslint-disable-next-line prettier/prettier
					'process': {
						template: 'processDisc',
					},
				},
			});
			chart.onNodeClick((args) => {
				if (args.node && args.node.id) {
					const node = chart.get(args.node.id);
					onClickNode(node);
				}
				return false;
			});
		}
	}, [nodes]);

	return <div id='tree' ref={divRef}></div>;
};
