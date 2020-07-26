import { createContext } from 'react';
import { observable, action, runInAction, decorate } from 'mobx';
import axios from 'axios';

// mobx.configure({ enforceActions: 'observed' });

export enum FETCH_STATUS {
	FETCH_DONE = 'FETCH_DONE',
	FETCH_FAILED = 'FETCH_FAILED',
	FETCH_PENDING = 'FETCH_PENDING',
	NONE = 'NONE',
}

class Store {
	@observable words: any = [];
	// @observable state = 'pending'; // "pending" / "done" / "error"
	@observable number = 0;
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
			// after await, modifying state again, needs an actions:
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
