using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SpaceCommandR.Server.Classes;
using System.Collections.Concurrent;

namespace SpaceCommandR.Server
{
    public class CommandHub : Hub
    {
        private readonly static List<Player> _playerList = new List<Player>();
        private readonly static List<string> _playerNames = new List<string>();
        private int _maxPlayers = 4;

        public void JoinGame(string userName, string color)
        {
            //_playerList.Clear();
            var player = new Player
            {
                id = _playerList.Count()+1,
                name = userName,
                color = color,
                score = 0,
                energy = 20,
                isAlive = true,
                isActive = false
            };

            if (!_playerNames.Contains(userName) && _playerList.Count() <= _maxPlayers)
            {
                _playerList.Add(player);

                //send the new player data to the rest of the subscribers
                Clients.Others.addPlayer(player);
            }
            
            //send the current game state back to the caller
            Clients.Caller.updatePlayers(_playerList);
        }

        public void LaunchProjectile(string station, double x, double y, double vx, double vy)
        {
            Clients.All.spawnProjectile(station, x, y, vx, vy);
        }

        public void SetStation(int stationID)
        {
            Clients.All.setStation(stationID);
        }
    }
}