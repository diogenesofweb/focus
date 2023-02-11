import type { Accent, IconName } from '@kazkadien/svelte/types';

export type IIconName =
	| 'flag'
	| 'code'
	| 'workspaces'
	| 'volume_up'
	| 'play_arrow'
	| 'pause'
	| 'edit'
	| 'settings'
	| 'local_cafe'
	| 'self_improvement'
	| 'sports_gymnastics';

export type IMyIcon = IconName | IIconName;

export type Phase = 'focus' | 'break';

export interface Activity {
	id: number;
	action: string;
}

export type Break = 'short' | 'long';

type BreakItemIconName = Extract<
	IMyIcon,
	'local_cafe' | 'sports_gymnastics' | 'self_improvement'
>;
interface BreakItemIcon {
	name: BreakItemIconName;
	accent: Accent;
}
interface BreakItem {
	duration: number;
	type: Break;
	icon: BreakItemIcon;
	activity: string;
}
interface FocusItemIcon {
	name: IMyIcon;
	accent: Accent;
}
interface FocusItem {
	duration: number;
	task: string;
	icon: FocusItemIcon;
}

export interface Round {
	focus: FocusItem;
	break: BreakItem;
}

export type Sequence = Round[];

export interface Station {
	id: number;
	src: string;
	name: string;
}
