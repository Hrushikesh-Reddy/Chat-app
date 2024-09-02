import {io} from 'socket.io-client'

const URL = "https://c37ebc4c-8f89-49f7-bc20-30c8c34ad918-dev.e1-us-east-azure.choreoapis.dev/chatapp/backend/v1.0"

export const socket = io(URL, {autoConnect:false}) 