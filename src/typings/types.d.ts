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

export type Break = 'short' | 'long';

type BreakItemIconName = Extract<
	IMyIcon,
	'local_cafe' | 'sports_gymnastics' | 'self_improvement'
>;