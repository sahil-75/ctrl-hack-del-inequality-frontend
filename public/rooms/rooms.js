/* eslint-disable no-undef */
window.Rooms = (function () {
	let socket = null;
	let isInitialized = false;

	// TODO: change this for production
	const URL = 'https://ctrl-hack-del-inequality-be.herokuapp.com';
	const defaultOptions = { transports: ['websocket'] };
	return {
		/**
		 * Call this function once on application mount with user details to initialize server
		 * @param {object} user user details
		 * @param {string} url connection url
		 * @param {object} options connection options
		 */
		init: function (user, url = URL, options = defaultOptions) {
			if (!io) {
				throw new Error('Socket is not present');
			}

			if (!user || !user.email) {
				throw new Error('User email is required for initialization');
			}

			if (!user.email.split('@')[1]) {
				throw new Error('User email does not have a doamin');
			}

			socket = io(url, options);

			socket.on('connect', () => {
				console.log('Socket connection established');

				socket.emit('init', user);

				isInitialized = true;
			});

			socket.on('disconnect', () => {
				isInitialized = false;
			});

			socket.on('connect_error', () => {
				isInitialized = false;
			});
		},
		/**
		 * Joins a user to room
		 * @param {string} room room name
		 * @param {object} user user details
		 */
		join: function (room, user) {
			if (socket && isInitialized) {
				socket.emit('join', { room, user });
			} else {
				throw new Error('Socket not initialized');
			}
		},
		/**
		 * Leaves a room
		 * @param {string} room room name
		 * @param {object} user user details
		 */
		leave: function (room, user) {
			if (socket && isInitialized) {
				socket.emit('leave', { room, user });
			} else {
				throw new Error('Socket not initialized');
			}
		},
		/**
		 * Sends a text message to current room
		 * @param {string} message Message to send
		 */
		sendMessage: function (message) {
			if (socket && isInitialized) {
				socket.emit('sendMessage', {
					message,
					timestamp: new Date(),
				});
			} else {
				throw new Error('Socket not initialized');
			}
		},
		/**
		 * Attach listeners to server
		 * @param {key} key listener key
		 * @param {Function} callback callback function to attach
		 * Listener keys available:
		 *  - "message": Receive incoming chat message
		 *  - "roomData": Receive current room data
		 *  - "rooms": Receive all rooms in current user's domain
		 *  - "issue": Receive error messages that occur in server
		 */
		addListener: function (key, callback) {
			if (socket) {
				socket.on(key, (data) => {
					callback && callback(data);
				});
			} else {
				throw new Error('Socket not initialized');
			}
		},
		disconnect: function () {
			if (socket) {
				socket.disconnect();
			}

			isInitialized = false;
		},
		isInitialized,
	};
})();
