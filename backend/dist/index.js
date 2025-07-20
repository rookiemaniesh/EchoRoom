"use strict";
// 
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8081 });
const allSocket = [];
// Helper function to log room status
function logRoomStatus() {
    const roomCounts = {};
    allSocket.forEach(user => {
        roomCounts[user.room] = (roomCounts[user.room] || 0) + 1;
    });
    console.log("📊 Room status:", roomCounts);
    console.log("👥 Total connected users:", allSocket.length);
}
// Helper function to broadcast to room
function broadcastToRoom(room, message, excludeSocket) {
    let sentCount = 0;
    allSocket.forEach((u, i) => {
        if (u.room === room && u.socket !== excludeSocket) {
            console.log(`📤 Sending to user #${i} in room ${room}`);
            u.socket.send(JSON.stringify(message));
            sentCount++;
        }
    });
    console.log(`📤 Sent message to ${sentCount} users in room ${room}`);
}
wss.on("connection", (socket) => {
    console.log("🟢 New client connected");
    socket.on("message", (e) => {
        const parsedMessage = JSON.parse(e.toString());
        console.log("📨 Received message:", parsedMessage.type, parsedMessage.payload);
        if (parsedMessage.type === "join") {
            const roomId = parsedMessage.payload.roomId;
            const username = parsedMessage.payload.username;
            console.log("✅ User joined room:", roomId, "as", username);
            // Check if user already exists and update room/username
            const existingUserIndex = allSocket.findIndex((u) => u.socket === socket);
            if (existingUserIndex !== -1) {
                allSocket[existingUserIndex].room = roomId;
                allSocket[existingUserIndex].username = username;
                console.log("🔄 Updated existing user's room and username to:", roomId, username);
            }
            else {
                allSocket.push({ socket, room: roomId, username });
                console.log("➕ Added new user to room:", roomId, "as", username);
            }
            logRoomStatus();
            socket.send(JSON.stringify({
                type: "system",
                payload: { message: `You joined room: ${roomId} as ${username}` },
            }));
            // Notify others in the room that someone joined
            broadcastToRoom(roomId, {
                type: "system",
                payload: { message: `${username} joined the room` },
            }, socket);
        }
        if (parsedMessage.type === "chat") {
            console.log("💬 Message received:", parsedMessage.payload.message);
            // ✅ Get the room and username of this socket
            const currentUser = allSocket.find((u) => u.socket === socket);
            if (!currentUser) {
                console.warn("⚠️ User not found in socket list");
                console.log("🔍 Current socket list:", allSocket.map(u => ({ room: u.room, username: u.username, socketId: u.socket.readyState })));
                logRoomStatus();
                return;
            }
            const room = currentUser.room;
            const author = currentUser.username;
            console.log("🏠 Broadcasting to room:", room, "from", author);
            // ✅ Broadcast to everyone in the same room
            broadcastToRoom(room, {
                type: "chat",
                payload: {
                    message: parsedMessage.payload.message,
                    author,
                },
            });
        }
    });
    socket.on("close", () => {
        console.log("🔴 Socket disconnected");
        const index = allSocket.findIndex((u) => u.socket === socket);
        if (index !== -1) {
            const user = allSocket[index];
            console.log(`➖ Removed user from room: ${user.room} (${user.username})`);
            // Notify others in the room that someone left
            broadcastToRoom(user.room, {
                type: "system",
                payload: { message: `${user.username} left the room` },
            });
            allSocket.splice(index, 1); // Remove user from list
            logRoomStatus();
        }
    });
});
