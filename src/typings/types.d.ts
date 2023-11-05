import type { MyIconName } from '$lib/vars';
import type { Accent, IconName } from '@kazkadien/svelte/types';

export type IMyIcon = IconName | MyIconName;

export type Phase = 'focus' | 'break';

export type Break = 'short' | 'long';

type BreakItemIconName = Extract<
	IMyIcon,
	'local_cafe' | 'sports_gymnastics' | 'self_improvement'
>;

