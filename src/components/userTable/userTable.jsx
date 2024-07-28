import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './userTable.module.scss';
import UserModal from '../userModal/userModal.jsx';
import userStore from '../../stores/userStore.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable = observer(() => {
    useEffect(() => {
        userStore.fetchUsers();
    }, []);

    const handleSearch = (event) => {
        userStore.search(event.target.value);
    };

    const handleSort = (key) => {
        userStore.sortUsers(key);
    };

    const handleSelectUser = (user) => {
        userStore.selectUser(user);
    };

    const handleResize = (e) => {
        const th = e.target.parentElement;
        let startX = e.clientX;
        let startWidth = th.offsetWidth;

        const onMouseMove = (e) => {
            let newWidth = startWidth + (e.clientX - startX);
            if (newWidth < 50) {
                newWidth = 50;
            }
            th.style.width = `${newWidth}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className={styles['user-table-container']}>
            <div className="input-group mt-3 mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={userStore.searchQuery}
                    onChange={handleSearch}
                />
                {/* Выпадающий список для поиска через filter */}
                {/* <div className="dropdown">
                    <button
                        className="btn btn-outline-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {userStore.visibleKey}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href="#" onClick={() => userStore.handleSelect('firstName', 'Фио')}>Фио</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => userStore.handleSelect('age', 'Возраст')}>Возраст</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => userStore.handleSelect('gender', 'Пол')}>Пол</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => userStore.handleSelect('phone', 'Номер телефона')}>Номер телефона</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => userStore.handleSelect('address.city', 'Адрес')}>Адрес</a></li>
                    </ul>
                </div> */}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div onClick={() => handleSort('firstName')} className={styles.table__text}>
                                ФИО{userStore.sortConfig && userStore.sortConfig.key === 'firstName' && (userStore.sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                            </div>
                            <div className={styles.resizer} onMouseDown={handleResize}></div>
                        </th>
                        <th>
                            <div onClick={() => handleSort('age')} className={styles.table__text}>
                                Возраст{userStore.sortConfig && userStore.sortConfig.key === 'age' && (userStore.sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                            </div>
                            <div className={styles.resizer} onMouseDown={handleResize}></div>
                        </th>
                        <th>
                            <div onClick={() => handleSort('gender')} className={styles.table__text}>
                                Пол{userStore.sortConfig && userStore.sortConfig.key === 'gender' && (userStore.sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                            </div>
                            <div className={styles.resizer} onMouseDown={handleResize}></div>
                        </th>
                        <th>
                            <div className={styles.table__text}>Номер телефона</div>
                            <div className={styles.resizer} onMouseDown={handleResize}></div>
                        </th>
                        <th>
                            <div onClick={() => handleSort('address.city')} className={styles.table__text}>
                                Адрес{userStore.sortConfig && userStore.sortConfig.key === 'address.city' && (userStore.sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                            </div>
                            <div className={styles.resizer} onMouseDown={handleResize}></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {userStore.users.map((user, ix) => (
                        <tr key={ix} onClick={() => handleSelectUser(user)}>
                            <td>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{`${user.address.city}, ${user.address.address}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {userStore.selectedUser && <UserModal user={userStore.selectedUser} onClose={() => userStore.closeUserModal()} />}
        </div>
    );
});

export default UserTable;
