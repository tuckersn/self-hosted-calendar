import { useDispatch, useSelector } from "react-redux";
import { setTitle as setTitleReducerFunc } from "../store/headSlice";
export function useTitle(): [string, (title: string) => void] {
	const title: string = useSelector<any>(state => state.head.title) as any;
	const dispatch = useDispatch();

	function setTitle(title: string) {
		dispatch(setTitleReducerFunc(title) as any);
	}

	return [title, setTitle];
}