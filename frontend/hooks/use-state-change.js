import { useState, useCallback, useEffect, useRef } from "react";

export function useStateChange(state) {
	const [dirty, setDirty] = useState(false);
	const previousStateRef = useRef(state && state.copy());

	const setPreviousState = useCallback(function (newState) {
		previousStateRef.current = newState && newState.copy();
		setDirty(false);
	}, []);

	useEffect(
		function () {
			const previousState = previousStateRef.current;
			const dataUnchanged = previousState ? previousState.equalTo(state) : previousState === state;
			setDirty(!dataUnchanged);
		},
		[state]
	);

	return [dirty, previousStateRef.current, setPreviousState];
}
