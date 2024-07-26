import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UserModal from './userModal.jsx';

const user = {
    firstName: 'Max',
    lastName: 'Cheb',
    maidenName: 'Smith',
    age: 20,
    gender: 'Male',
    address: { city: 'Tomsk', address: 'Main' },
    height: 180,
    weight: 75,
    phone: '123-456-7890',
    email: 'test@test.test'
};

test('display user details in modal', () => {
    

    

    const { getByText } = render(
        <UserModal user={user} onClose={() => {}} />
    );



    expect(getByText(/Max Cheb Smith/)).toBeInTheDocument();
    expect(getByText(/Возраст:/).nextSibling).toHaveTextContent('20');
    expect(getByText(/Пол:/).nextSibling).toHaveTextContent('Male');
    expect(getByText(/Адрес:/).nextSibling).toHaveTextContent('Tomsk, Main');
    expect(getByText(/Рост:/).nextSibling).toHaveTextContent('180');
    expect(getByText(/Вес:/).nextSibling).toHaveTextContent('75');
    expect(getByText(/Телефон:/).nextSibling).toHaveTextContent('123-456-7890');
    expect(getByText(/Email:/).nextSibling).toHaveTextContent('test@test.test');

});

test('close modal', () => {
    const onClose = jest.fn(); 
    const { getByText } = render(
        <UserModal user={user} onClose={onClose} />
    );

    fireEvent.click(getByText(/Закрыть/));

    expect(onClose).toHaveBeenCalled();
})