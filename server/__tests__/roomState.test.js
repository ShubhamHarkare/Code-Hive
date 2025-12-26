describe('Room State Management', () => {
  let roomState;

  beforeEach(() => {
    // Mock room state manager
    roomState = {
      rooms: {},
      createRoom: function(roomId) {
        this.rooms[roomId] = {
          code: '',
          users: []
        };
      },
      addUser: function(roomId, userId) {
        if (this.rooms[roomId]) {
          this.rooms[roomId].users.push(userId);
        }
      },
      removeUser: function(roomId, userId) {
        if (this.rooms[roomId]) {
          this.rooms[roomId].users = this.rooms[roomId].users.filter(
            id => id !== userId
          );
        }
      },
      updateCode: function(roomId, code) {
        if (this.rooms[roomId]) {
          this.rooms[roomId].code = code;
        }
      }
    };
  });

  test('creates new room', () => {
    roomState.createRoom('room-1');
    expect(roomState.rooms['room-1']).toBeDefined();
    expect(roomState.rooms['room-1'].users).toEqual([]);
  });

  test('adds user to room', () => {
    roomState.createRoom('room-1');
    roomState.addUser('room-1', 'user-1');
    expect(roomState.rooms['room-1'].users).toContain('user-1');
  });

  test('removes user from room', () => {
    roomState.createRoom('room-1');
    roomState.addUser('room-1', 'user-1');
    roomState.removeUser('room-1', 'user-1');
    expect(roomState.rooms['room-1'].users).not.toContain('user-1');
  });

  test('updates room code', () => {
    roomState.createRoom('room-1');
    const newCode = 'console.log("test")';
    roomState.updateCode('room-1', newCode);
    expect(roomState.rooms['room-1'].code).toBe(newCode);
  });
});