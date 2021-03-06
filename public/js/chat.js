const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoScroll = () => {
    //New message element
    const $newMessage = $messages.lastElementChild;

    //Height of the new message element
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom);
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    //visible height of the new message element
    const visibleHeight = $messages.offsetHeight

    //Height of messages container
    const containerHeight = $messages.scrollHeight

    //How far have i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if((containerHeight - newMessageHeight) <= scrollOffset) {
        $messages.scrollTop = $messages.scrollTop + newMessageHeight
    }

}   

socket.on('message', (msg) => {
    
    const html = Mustache.render(messageTemplate, {
        username: msg.username,
        createdAt: moment(msg.createdAt).format('h:mm a'),
        message: msg.text,
    })
    $messages.insertAdjacentHTML('beforeend', html)

    autoScroll();
})

socket.on('locationMessage', (msg) => {
  
    const html = Mustache.render(locationMessageTemplate, {
        username: msg.username,
        createdAt: moment(msg.createdAt).format('h:mm a'),
        url: msg.url,
    })
    $messages.insertAdjacentHTML('beforeend', html)

    autoScroll();
})

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})


$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    const msg = e.target.elements.message.value;

    socket.emit('sendMsg', msg, (error) => {
        
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if(error) {
            return alert(error)
        }

        console.log('Message delivered!');
    });
})

$locationButton.addEventListener('click', () => {

    $locationButton.setAttribute('disabled', 'disabled');

    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute('disabled');
            console.log("Location shared");
        })
    })
})

socket.emit('join', {
    username,
    room
}, (error) => {
    if(error){
        alert(error);
        location.href = '/';
    }
})