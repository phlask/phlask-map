import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
