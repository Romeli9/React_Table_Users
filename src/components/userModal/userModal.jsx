import React from 'react';
import styles from './userModal.module.scss';

const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                <h2>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</h2>
                <p><strong>Возраст: </strong>{user.age}</p>
                <p><strong>Пол: </strong>{user.gender}</p>
                <p><strong>Адрес: </strong>{`${user.address.city}, ${user.address.address}`}</p>
                <p><strong>Рост: </strong>{user.height} см</p>
                <p><strong>Вес: </strong>{user.weight} кг</p>
                <p><strong>Телефон: </strong>{user.phone}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default UserModal;
