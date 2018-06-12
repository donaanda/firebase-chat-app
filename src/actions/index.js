import types from './types';
import db from '../firebase';

export function updateChat(roomData) {

    console.log('Room Data:', roomData);

    return {
        type: types.UPDATE_CHAT_LOG,
        chatLog: roomData['chatLog'],
        name: roomData.name
    }
}

export function updateInput(name, value) {
    return {
        type: types.UPDATE_INPUT,
        payload: {name, value}
    }
}

export function sendMessageToDatabase(id, message) {
    db.ref(`/chat-rooms/${id}/chatLog`).push({
        name: 'Stu',
        message
    });

    return {
        type: types.SEND_MESSAGE
    }
}

export function clearInput(name) {
    return {
        type: types.CLEAR_INPUT,
        payload: name
    }
}

export async function createRoom(name) {

    const newRoom = {
        name,
        'chatLog': {
            0: {
                message: `Welcome to room: ${name}`,
                name: 'Admin'
            }
        }
    }

    const response = await db.ref('/chat-rooms').push(newRoom);

    console.log('Key:', response.key);

    return response.key;
}