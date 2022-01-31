export type IconName =
	| 'flag'
	| 'volume_up'
	| 'play_arrow'
	| 'pause'
	| 'edit'
	| 'settings'
	| 'local_cafe'
	| 'sports_gymnastics';

export type Phase = 'focus' | 'break';

export interface Activity {
	id: number;
	action: string;
}

export type Break = 'short' | 'long';

interface Item {
	duration: number;
	type?: Break;
}

export interface Round {
	focus: Item;
	break: Item;
}

export type Sequence = Round[];

export interface Station {
	id: number;
	src: string;
	name: string;
}
