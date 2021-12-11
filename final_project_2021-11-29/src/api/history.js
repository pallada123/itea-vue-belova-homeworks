const storageName = 'history';

const api =  {

    /**
     *
     * @returns {any}
     */
    pullStorage() {
        const storage = localStorage.getItem(storageName);
        if (!storage) {
            const data = [];
            localStorage.setItem(storageName, JSON.stringify(data));
            return data;
        }
        return JSON.parse(storage);
    },

    /**
     *
     * @param data
     */
    updateHistory(data) {
        this.pullStorage();
        localStorage.setItem(storageName, JSON.stringify(data));
    },

};


export default api;