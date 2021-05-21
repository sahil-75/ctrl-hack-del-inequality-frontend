export const loadState = () => {
	try {
		const localState = localStorage.getItem('state');
		if (localState === null) {
			return undefined;
		}
		return JSON.parse(localState);
	} catch (err) {
		return undefined;
	}
};

export const saveState = (state: any) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch {}
};
