import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import Input from "./input/input";
import Button from "./button/button";

export const Game = (props) => {

    const data = props.location.data;
    console.log(data);

    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('')

    const socket = useRef();

    function connect(){
        socket.current = new WebSocket('ws://localhost:8999');

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message));
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setMessages(prev => [message, ...prev]);
        }

        socket.current.onclose = () => {
            console.log('Socket closed');
        }

        socket.current.onerror = () => {
            console.log('Socket error');
        }
    }

    const sendMessage = async () => {
        const message = {
            message: value,
            id: Date.now(),
            event: 'message'
        }
        socket.current.send(JSON.stringify(message));
        setValue('');
    }

    if(!connected){
        return (
            <div className="center" style={{zIndex:3}}>
                <div className="form">
                    <input
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя"/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
    }



    return (
        <div style={{zIndex:3}}>
            <h1>Game</h1>
            {/*<form>*/}
            {/*    <Input />*/}
            {/*    <Button*/}
            {/*    onClick={(e)=>{*/}
            {/*        e.preventDefault();*/}
            {/*        let outMessage = e.target.form[0].value;*/}
            {/*        //console.log(outMessage);*/}
            {/*        socket.send(outMessage);*/}
            {/*    }}*/}
            {/*    />*/}
            {/*</form>*/}
            <div className="form">
                <input value={value} onChange={e => setValue(e.target.value)} type="text"/>
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {messages.map(mess =>
                    <div key={mess.id}>
                        {mess.event === 'connection'
                            ? <div className="connection_message">
                                Пользователь {mess.username} подключился
                            </div>
                            : <div className="message">
                                {mess.username}. {mess.message}
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Game;