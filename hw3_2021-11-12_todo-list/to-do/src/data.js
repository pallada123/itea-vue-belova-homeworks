const storageName = 'toDoList';

/* storage data */
export default class Storage {

    /**
     *
     * @returns {*[]|any}
     */
    static pullUsers() {
        if (localStorage.getItem(storageName)) {
            return JSON.parse(localStorage.getItem(storageName));
        } else {
            return [];
        }
    }

    /**
     *
     * @param value
     */
    static addUser(value) {
        let data = Storage.pullUsers();
        data.push(value);
        localStorage.setItem(storageName, JSON.stringify(data));
    }

    // static removeUser(index) {
    //     let data = Storage.pullUsers();
    //     data.splice(index, 1);
    //     localStorage.setItem(storageName, JSON.stringify(data));
    // }

    /**
     *
     * @param item
     * @param index
     */
    static updateUser(item, index) {
        let data = Storage.pullUsers();
        data[index] = item;
        localStorage.setItem(storageName, JSON.stringify(data));
    }
}
/* /storage data */