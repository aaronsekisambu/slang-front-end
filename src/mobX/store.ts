import { createContext } from 'react';
import { observable, action, runInAction } from 'mobx';
import axios from 'axios';

export enum FETCH_STATUS {
	FETCH_DONE = 'FETCH_DONE',
	FETCH_FAILED = 'FETCH_FAILED',
	FETCH_PENDING = 'FETCH_PENDING',
	NONE = 'NONE',
}

class Store {
	@observable words: any = [];
	@observable number: number = 0;
	@observable passed: number = 0;
	@observable speltWord: Boolean = false;
	@observable wrongWord: Boolean = false;
	@observable start: Boolean = false;
	@observable error: string = '';
	@observable status: FETCH_STATUS = FETCH_STATUS.NONE;

	@action
	setNumber(num: number) {
		this.number = num;
	}

	@action
	async fetchWords() {
		this.words = [];
		this.status = FETCH_STATUS.FETCH_PENDING;
		try {
			const URL = `${process.env.REACT_APP_API_BACKEND_URL}/start-now`;
			const getWords = await axios.post(URL, { number: this.number });
			const {
				data: { data },
			} = getWords;

			runInAction(() => {
				this.status = FETCH_STATUS.FETCH_DONE;
				this.words = data;
			});
		} catch (error) {
			runInAction(() => {
				this.status = FETCH_STATUS.FETCH_FAILED;
			});
		}
	}
}
// export default Store;

export const MainStore = createContext(new Store());
