const storageName = 'history';

const api =  {

    /**
     * Запрашивает из ЛС полный массив данных.
     * Если ЛС с соответствующим именем ещё не существует - отправляет туда пустой массив.

     * @returns {any} - полный массив данных стореджа.
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
     * Принимает и отправляет в ЛС изменёный массив истории.
     * @param data
     */
    updateHistory(data) {
        this.pullStorage();
        localStorage.setItem(storageName, JSON.stringify(data));
    },

};


export default api;