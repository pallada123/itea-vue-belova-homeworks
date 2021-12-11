import testDataBase from '../data/testStorageData.js'; // for testing only

const storageName = 'toDoList';

const api =  {

    /**
     * For testing only:
     * отправляет в объект тестовых пользователей
     */
    pushTestStorage() {
        if (!this.pullStorage().usersList.length) {
            localStorage.setItem(storageName, JSON.stringify(testDataBase));
        }
    },

    /**
     * Запрашивает из ЛС полный объект данных.
     * Если ЛС с соответствующим именем ещё не существует - отправляет туда шаблон.

     * @returns {any} - полный объект данных стореджа.
     */
    pullStorage() {
        if (!localStorage.getItem(storageName)) {
            const data = {
                activeUserId: 0,
                usersList: [],
                usersData: []
            }
            localStorage.setItem(storageName, JSON.stringify(data));
        }
        return JSON.parse(localStorage.getItem(storageName));
    },

    /**
     * Если хотя бы один пользователь уже существует в ЛС -
     * отдаёт массив объектов пользователей.
     * Если нет ни одного пользователя - отдаёт null.
     */
    getActiveUser() {
        const data = this.pullStorage();
        if (!data.usersList) {
            return null;
        }
        return data.usersList.find((item) => item.userId === data.activeUserId);
    },

    /**
     * Получает из ЛС и отдаёт ID активного пользователя.
     * @param activeUserId
     */
    setActiveUser(activeUserId) {
        const data = this.pullStorage();
        data.activeUserId = activeUserId
        localStorage.setItem(storageName, JSON.stringify(data));
    },

    /**
     * При регистрации нового пользователя.
     * Плучает ID нового пользователя и массив всех пользователей, включая нового, и отправляет в ЛС.
     *
     * Если пользователя с полученным ID ранее не существовало, отправляет в ЛС шаблон под todolist нового пользователя.

     * @param userId
     * @param usersArray
     */
    updateUsersList(userId, usersArray) {
        const data = this.pullStorage();

        data.usersList = usersArray.map(item => item);

        const newUserData = {
            userId: userId,
            toDoList: []
        }

        data.usersData.push(newUserData);

        localStorage.setItem(storageName, JSON.stringify(data));
    },

    /**
     * Когда пользователь добавил / изменил / удалил таску.
     * Принимает ID пользователя и массив всех задач этого пользователя.
     * Обновляет массив задач пользователя в ЛС.
     * @param userId
     * @param toDoArray
     */
    updateUserToDoList(userId, toDoArray) {
        const data = this.pullStorage();

        const user = data.usersData.find((item) => item.userId === userId);
        user.toDoList = toDoArray;

        localStorage.setItem(storageName, JSON.stringify(data));
    },

    /**
     * Находит в ЛС и отдаёт массив задач пользователя с полученным ID.
     * @param userId
     * @returns {}
     */
    getUserToDoList(userId) {
        const data = this.pullStorage();

        return data.usersData.find((item) => item.userId === userId).toDoList;
    },

    /**
     * Получает из ЛС и отдаёт массив объектов всех пользователей.
     */
    getUsersList() {
        const data = this.pullStorage();

        return data.usersList;
    }

};


export default api;