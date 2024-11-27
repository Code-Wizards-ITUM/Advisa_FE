// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
// import { db } from '../config/firebase';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function ChatHeadsScreen({ navigation }) {
//     const [chatHeads, setChatHeads] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [userEmail, setUserEmail] = useState('');
//     const [userNames, setUserNames] = useState({}); // To store user names by email

//     useEffect(() => {
//         const fetchChatHeads = async () => {
//             const email = await AsyncStorage.getItem('userEmail');
//             setUserEmail(email);
//             const chatsRef = collection(db, 'chats');
//             const q = query(chatsRef, where('participants', 'array-contains', email));

//             const fetchedChatHeads = [];
//             const snapshot = await getDocs(q);
//             for (const doc of snapshot.docs) {
//                 const data = doc.data();
//                 const otherUserEmail = data.participants.find(email => email !== userEmail);

//                 // Fetch the last message for this chat
//                 const lastMessageData = await getLastMessage(doc.id, data.names); // Pass names for lookup

//                 fetchedChatHeads.push({
//                     chatId: doc.id,
//                     otherUserName: data.names[otherUserEmail], // Get the name from the names object
//                     otherUserEmail: otherUserEmail, // Keep the email for later use
//                     lastMessage: lastMessageData.message || '', // Last message text
//                     lastMessageSender: lastMessageData.senderName || 'Unknown', // Last message sender's name
//                 });

//                 // Store user names for lookup
//                 setUserNames(prev => ({
//                     ...prev,
//                     [otherUserEmail]: data.names[otherUserEmail], // Save user name
//                     [userEmail]: data.names[userEmail], // Save own name
//                 }));
//             }

//             setChatHeads(fetchedChatHeads);
//         };

//         fetchChatHeads();
//     }, [userEmail]);

//     const getLastMessage = async (chatId, names) => {
//         const messagesRef = collection(db, 'chats', chatId, 'messages');
//         const messagesQuery = query(messagesRef, orderBy('time', 'desc'), limit(1)); // Get the last message
//         const messagesSnapshot = await getDocs(messagesQuery);
        
//         if (!messagesSnapshot.empty) {
//             const lastMessageDoc = messagesSnapshot.docs[0].data();
//             // Get the sender's name using the names object
//             const senderName = names[lastMessageDoc.sender] || 'Unknown'; // Use senderEmail from the message
//             return {
//                 message: lastMessageDoc.message || '', // Last message text
//                 senderName: senderName, // Last message sender's name
//             };
//         }
//         return { message: '', senderName: 'Unknown' }; // Return empty values if no messages
//     };

//     const filteredChatHeads = chatHeads.filter(chat =>
//         chat.otherUserName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     const truncateMessage = (message, maxLength = 50) => {
//       return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
//   };
//     const renderChatHead = ({ item }) => (
//         <TouchableOpacity
//             style={styles.chatCard}
//             onPress={() => navigation.navigate('ChatInside', { chatId: item.chatId, userNames: { [userEmail]: userNames[userEmail], [item.otherUserEmail]: item.otherUserName } })} // Pass both user names
//         >
//             <FontAwesome name="user-circle" size={30} color="#4A90E2" style={styles.userIcon} />
//             <View style={styles.chatTextContainer}>
//                 <Text style={styles.chatUsername}>{item.otherUserName}</Text>
//                 <Text style={styles.chatMessagePreview}>
//                     {item.lastMessage ? `${item.lastMessageSender} : ${truncateMessage(item.lastMessage)}` : 'No messages yet'}
//                 </Text>
//             </View>
//             <FontAwesome name="chevron-right" size={20} color="#ccc" />
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchInput}
//                 placeholder="Search chats..."
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//             />
//             <FlatList
//                 data={filteredChatHeads}
//                 renderItem={renderChatHead}
//                 keyExtractor={(item) => item.chatId}
//                 ListEmptyComponent={<Text style={styles.emptyText}>No chats found</Text>}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f9f9f9',
//         padding: 10,
//     },
//     searchInput: {
//         height: 40,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 20,
//         paddingHorizontal: 15,
//         fontSize: 16,
//         backgroundColor: '#fff',
//         marginBottom: 10,
//     },
//     chatCard: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//         padding: 15,
//         borderRadius: 10,
//         marginVertical: 5,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 2,
//     },
//     userIcon: {
//         marginRight: 15,
//     },
//     chatTextContainer: {
//         flex: 1,
//     },
//     chatUsername: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     chatMessagePreview: {
//         fontSize: 14,
//         color: '#777',
//         marginTop: 2,
//     },
//     emptyText: {
//         textAlign: 'center',
//         color: '#777',
//         marginTop: 20,
//         fontSize: 16,
//     },
// });
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../config/firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ChatHeadsScreen({ navigation }) {
    const [chatHeads, setChatHeads] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNames, setUserNames] = useState({}); // To store user names by email

    useFocusEffect(
        React.useCallback(() => {
            const fetchChatHeads = async () => {
                const email = await AsyncStorage.getItem('userEmail');
                setUserEmail(email);
                const chatsRef = collection(db, 'chats');
                const q = query(chatsRef, where('participants', 'array-contains', email));

                const fetchedChatHeads = [];
                const snapshot = await getDocs(q);
                for (const doc of snapshot.docs) {
                    const data = doc.data();
                    const otherUserEmail = data.participants.find(email => email !== userEmail);

                    // Fetch the last message for this chat
                    const lastMessageData = await getLastMessage(doc.id, data.names); // Pass names for lookup

                    fetchedChatHeads.push({
                        chatId: doc.id,
                        otherUserName: data.names[otherUserEmail], // Get the name from the names object
                        otherUserEmail: otherUserEmail, // Keep the email for later use
                        lastMessage: lastMessageData.message || '', // Last message text
                        lastMessageSender: lastMessageData.senderName || 'Unknown', // Last message sender's name
                    });

                    // Store user names for lookup
                    setUserNames(prev => ({
                        ...prev,
                        [otherUserEmail]: data.names[otherUserEmail], // Save user name
                        [userEmail]: data.names[userEmail], // Save own name
                    }));
                }

                setChatHeads(fetchedChatHeads);
            };

            fetchChatHeads();
        }, [userEmail]) // Re-run when userEmail changes
    );

    const getLastMessage = async (chatId, names) => {
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const messagesQuery = query(messagesRef, orderBy('time', 'desc'), limit(1)); // Get the last message
        const messagesSnapshot = await getDocs(messagesQuery);
        
        if (!messagesSnapshot.empty) {
            const lastMessageDoc = messagesSnapshot.docs[0].data();
            // Get the sender's name using the names object
            const senderName = names[lastMessageDoc.sender] || 'Unknown'; // Use senderEmail from the message
            return {
                message: lastMessageDoc.message || '', // Last message text
                senderName: senderName, // Last message sender's name
            };
        }
        return { message: '', senderName: 'Unknown' }; // Return empty values if no messages
    };

    const filteredChatHeads = chatHeads.filter(chat =>
        chat.otherUserName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const truncateMessage = (message, maxLength = 50) => {
        return message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;
    };

    const renderChatHead = ({ item }) => (
        <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('ChatInside', { chatId: item.chatId, userNames: { [userEmail]: userNames[userEmail], [item.otherUserEmail]: item.otherUserName } })} // Pass both user names
        >
            <FontAwesome name="user-circle" size={30} color="#4A90E2" style={styles.userIcon} />
            <View style={styles.chatTextContainer}>
                <Text style={styles.chatUsername}>{item.otherUserName}</Text>
                <Text style={styles.chatMessagePreview}>
                    {item.lastMessage ? `${item.lastMessageSender}: ${truncateMessage(item.lastMessage)}` : 'No messages yet'}
                </Text>
            </View>
            <FontAwesome name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search chats..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredChatHeads}
                renderItem={renderChatHead}
                keyExtractor={(item) => item.chatId}
                ListEmptyComponent={<Text style={styles.emptyText}>No chats found</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    userIcon: {
        marginRight: 15,
    },
    chatTextContainer: {
        flex: 1,
    },
    chatUsername: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    chatMessagePreview: {
        fontSize: 14,
        color: '#777',
        marginTop: 2,
    },
    emptyText: {
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
        fontSize: 16,
    },
});
