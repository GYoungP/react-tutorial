import React, { useRef, useReducer, useMemo, useCallback, createContext } from 'react';
import produce from 'immer';
import CreateUser from './CreateUser';
import UserList from './UserList';
import useInputs from './useInputs'

function counActiveUsers(users) {
	console.log('활성 사용자 수를 세는중...');
	return users.filter(user => user.active).length;
}

const initialstate = {
	users: [
        {
            id: 1,
            username: 'aaaa11',
            email: 'aaa11@naver.com',
			active: true,
        },
        {
            id: 2,
            username: 'bbbb22',
            email: 'bbb22@hanmail.net',
			active: false,

        },
        {
            id: 3,
            username: 'ccc33',
            email: 'nnn333@gmail.com',
			active: false,
        }
    ]
}
function reducer(state, action) {
	switch (action.type) {
		case 'CHANGE_USER':
		return {
			inputs: initialstate.inputs,
			users: state.users.concat(action.user)
		};
		case 'TOGGLE_USER':
		return {
			...state,
			users: state.users.map(user =>
				user.id === action.id
				? { ...user, active: !user.active}
				: user
				)
		}
		case 'REMOVE_USER':
		return {
			...state,
			users: state.users.filter( user => user.id !== action.id)
		}
		default:
		throw new Error('Unhandled action')
	}
}

export const UserDispatch = createContext(null);

function App() {
	const [state, dispatch] = useReducer(reducer, initialstate);
    const [form, onChange, reset] = useInputs({
        username:'',
        email:'',
    });
    const { username, email } = form;
	const nextId = useRef(4);
	const {users} = state;


	const onCreate = useCallback(() => {
		dispatch({
			type: 'CHANGE_USER',
			user: {
				id: nextId.current,
				username,
				email,
			}
		});
		nextId.current += 1;
        reset();
	}, [username, email, reset]);


    const conut = useMemo(() => counActiveUsers(users), [users])

	return (
		<UserDispatch.Provider value={dispatch}>
			<CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
			<UserList users={users} />
			<div>활성 사용자 수 : {conut}</div>
		</UserDispatch.Provider>
	)
}

export default App;
