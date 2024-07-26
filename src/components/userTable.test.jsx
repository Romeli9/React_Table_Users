import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { observer } from 'mobx-react';
import UserTable from './userTable.jsx';
import userStore from '../stores/userStore.js';
import UserModal from './userModal.jsx';

// Mocking userStore
jest.mock('../stores/userStore.js', () => ({
    fetchUsers: jest.fn(),
    search: jest.fn(),
    sortUsers: jest.fn(),
    selectUser: jest.fn(),
    closeUserModal: jest.fn(),
    users: [
        {
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
        }
    ],
    searchQuery: '',
    sortConfig: null,
    selectedUser: null
}));

test('render user table', () => {
    render(<UserTable />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('ФИО')).toBeInTheDocument();
    expect(screen.getByText('Возраст')).toBeInTheDocument();
    expect(screen.getByText('Пол')).toBeInTheDocument();
    expect(screen.getByText('Номер телефона')).toBeInTheDocument();
    expect(screen.getByText('Адрес')).toBeInTheDocument();
});

test('search input calls userStore.search', () => {
    render(<UserTable />);
    
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Max' } });

    expect(userStore.search).toHaveBeenCalledWith('Max');
});

test('sort columns call userStore.sortUsers', () => {
    render(<UserTable />);
    
    const nameHeader = screen.getByText('ФИО');
    fireEvent.click(nameHeader);
    
    expect(userStore.sortUsers).toHaveBeenCalledWith('firstName');
    
    const ageHeader = screen.getByText('Возраст');
    fireEvent.click(ageHeader);
    
    expect(userStore.sortUsers).toHaveBeenCalledWith('age');
});

test('select user calls userStore.selectUser', () => {
    render(<UserTable />);
    
    const userRow = screen.getByText('Max Cheb Smith');
    fireEvent.click(userRow);
    
    expect(userStore.selectUser).toHaveBeenCalledWith(userStore.users[0]);
});

test('resizer adjusts column width', () => {
    render(<UserTable />);
    
    const resizer = screen.getAllByClassName('resizer')[0];
    const th = resizer.parentElement;

    // Simulate mouse down and move events
    fireEvent.mouseDown(resizer, { clientX: 100 });
    fireEvent.mouseMove(document, { clientX: 150 });
    fireEvent.mouseUp(document);
    
    expect(th.style.width).toBe('100px'); // or the expected width
});

test('display and close modal', () => {
    userStore.selectedUser = userStore.users[0];
    render(<UserTable />);
    
    expect(screen.getByText('Max Cheb Smith')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Закрыть'));
    expect(userStore.closeUserModal).toHaveBeenCalled();
});
