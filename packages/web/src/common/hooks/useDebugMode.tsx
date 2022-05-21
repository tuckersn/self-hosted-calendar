import { useDispatch, useSelector } from "react-redux";
import { setDebugMode as setDebugModeReducerFunc } from "../store/debugSlice";

export function useDebugMode(): [boolean, (debugMode: boolean) => void] {
	const debugMode: boolean = useSelector<any>(state => state.debug.debugMode) as any;
	const dispatch = useDispatch();

	function setDebugMode(debugMode: boolean) {
		dispatch(setDebugModeReducerFunc(debugMode) as any);
	}

	return [debugMode, setDebugMode];
}