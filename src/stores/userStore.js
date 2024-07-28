import { makeAutoObservable } from 'mobx';

class UserStore {
    users = [];
    selectedUser = null;
    sortConfig = null;
    searchQuery = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchUsers() {
        try {
            const response = await fetch('https://dummyjson.com/users?limit=0');
            const data = await response.json();
            this.users = data.users;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // поиск через запрос пользователей
    async search(query) {
        this.searchQuery = query;
        if (query.length === 0) {
            await this.fetchUsers();
        } else {
            try {
                const response = await fetch('https://dummyjson.com/users');
                const data = await response.json();
                this.users = data.users.filter(user =>
                    `${user.firstName} ${user.lastName} ${user.maidenName}`.includes(query) ||
                    `${user.age}`.includes(query) ||
                    user.gender.toLowerCase().includes(query) ||
                    `${user.phone}`.includes(query) ||
                    `${user.address.city} ${user.address.address}`.includes(query)
                );
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    // Метода поиска через filter апи
    // selectedKey = '';
    // visibleKey = 'Выберите фильтр поиска';
    // async search(query) {
    //     this.searchQuery = query;
    //     if (query.length === 0) {
    //         await this.fetchUsers();
    //     } else {
    //         try {
    //             const encodedQuery = encodeURIComponent(query);
    //             const response = await fetch(`https://dummyjson.com/users/filter?key=${this.selectedKey}&value=${encodedQuery}`);
    //             console.log(response.url);
    //             const data = await response.json();
    //             this.users = data.users;
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    // }

    // handleSelect(key, key2) {
    //     this.selectedKey = key;
    //     this.visibleKey = key2;
    // }
    

    sortUsers(key) {
        let direction = 'asc';
        if (this.sortConfig && this.sortConfig.key === key) {
            if (this.sortConfig.direction === 'asc') {
                direction = 'desc';
            } else if (this.sortConfig.direction === 'desc') {
                direction = null;
            }
        }
        this.sortConfig = { key, direction };

        if (direction === null) {
            this.fetchUsers();
        } else {
            this.users = [...this.users].sort((a, b) => {
                const keyPath = key.split('.');
                const aValue = keyPath.reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : null, a);
                const bValue = keyPath.reduce((obj, k) => (obj && obj[k] !== 'undefined') ? obj[k] : null, b);

                if (aValue < bValue) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
    }

    selectUser(user) {
        this.selectedUser = user;
    }

    closeUserModal() {
        this.selectedUser = null;
    }
}

const userStore = new UserStore();
export default userStore;
