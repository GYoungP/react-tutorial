import React /* { useEffect } */ from 'react'

const User = React.memo(function User({user, onRemove, onToggle}) {
    const { username, email, id, active } = user;
    // useEffect(() => {
    //     console.log('설정됨');
    //     console.log(user);
    //     return (() => {
    //         console.log('바뀌기 전');
    //         console.log(user);
    //     }) /* 뒷정리함수 */
    // }, [user])
    return (
        <div>
            <b 
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() => onToggle(id)}
            >
                {username}</b> 
            &nbsp;
            <span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    )
});

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {
                users.map(
                    user => (<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />)
                )
            }
        </div>
    )
};

export default React.memo(UserList, (prevProps, nextProps) => nextProps.users === prevProps.users);

