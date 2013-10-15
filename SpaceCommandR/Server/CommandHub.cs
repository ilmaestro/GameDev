using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SpaceCommandR.Server.Classes;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace SpaceCommandR.Server
{
    public class CommandHub : Hub
    {
        private readonly static List<Player> _playerList = new List<Player>();
        private readonly static List<string> _playerNames = new List<string>();
        private readonly static ConcurrentDictionary<string, List<Player>> _Players = new ConcurrentDictionary<string, List<Player>>();

        private int _maxPlayers = 4;

        public CommandHub()
        {
            
        }

        public override Task OnConnected()
        {
            Clients.Caller.updateGames(_Players.Keys);
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            /*Todo: remove player */
            Clients.Caller.updateGames(_Players.Keys);
            return base.OnDisconnected();
        }

        public void SendGroup(string groupName, string name, string message)
        {
            Clients.Group(groupName).broadcastMessage(name, message);
        }

        /// <summary>
        ///     Add player to group
        /// </summary>
        /// <param name="groupName"></param>
        /// <param name="player"></param>
        public void JoinGroup(string groupName, Player player)
        {
            var playerList = GetPlayerListForGroup(groupName);
            if (playerList.Count() >= _maxPlayers)
            {
                Clients.Caller.broadCastMessage("Game, " + groupName + ", is full");
            }
            else if (!PlayerListContainsName(player.name, playerList))
            {
                player.id = playerList.Count()+1;
                playerList.Add(player);
                Groups.Add(Context.ConnectionId, groupName);
                
                Clients.OthersInGroup(groupName).addPlayer(player);
                Clients.OthersInGroup(groupName).broadCastMessage(player.name, "joined game.");
                Clients.All.updateGames(_Players.Keys);
            }
            
            Clients.Caller.updatePlayers(playerList);
            Clients.Caller.updateGames(_Players.Keys);
        }

        public void LeaveGroup(string groupName, Player player)
        {
            var playerList = GetPlayerListForGroup(groupName);
            RemovePlayerFromList(player.name, playerList);
            if (_Players[groupName].Count() == 0)
            {
                List<Player> p = _Players[groupName];
                _Players.TryRemove(groupName, out p);
            }
            Clients.OthersInGroup(groupName).updatePlayers(playerList);
            Clients.All.updateGames(_Players.Keys);
            Clients.Group(groupName).broadCastMessage(player.name, "Left game, " + groupName + ".");
            Groups.Remove(Context.ConnectionId, groupName);
        }

        public void ReadyPlayer(string groupName, Player currentPlayer)
        {
            var playerList = GetPlayerListForGroup(groupName);
            //set player active to true
            //playerList[currentPlayer.id - 1].isActive = true;
            SetPlayerActive(currentPlayer.name, playerList);

            // check if all players are active
            bool isReady = true;
            foreach (Player player in playerList)
            {
                if (!player.isActive)
                {
                    isReady = false;
                }
            }

            if (isReady)
            {
                Clients.Group(groupName).beginGame(playerList);
            }
        }

        public void LaunchProjectile(string groupName, string station, double x, double y, double vx, double vy)
        {
            Clients.Group(groupName).spawnProjectile(station, x, y, vx, vy);
        }

        public void endTurn(string groupName, List<Player> players, Player currentPlayer)
        {
            var playerList = GetPlayerListForGroup(groupName);
            //update players
            foreach (Player player in playerList)
            {
                player.Update(players[player.id - 1]);
                player.isActive = false;
            }

            //get next ALIVE player
            Player nextPlayer = null;
            bool nextRound = false;
            int playerIndex = currentPlayer.id - 1;

            while (nextPlayer == null)
            {
                playerIndex++;

                if (playerIndex > playerList.Count() - 1)
                {
                    playerIndex = 0;
                    nextRound = true;
                }

                if (playerList[playerIndex].isAlive)
                {
                    playerList[playerIndex].isActive = true;
                    nextPlayer = playerList[playerIndex];
                }
            }

            if (nextPlayer.id == currentPlayer.id)
            {
                Clients.Group(groupName).endGame(nextPlayer);
            }
            else if (nextRound)
            {
                Clients.Group(groupName).startRound(nextPlayer);
            }
            else
            {
                Clients.Group(groupName).startTurn(nextPlayer);
            }
        }

        public bool PlayerListContainsName(string name, List<Player> players)
        {
            bool retVal = false;
            foreach (Player p in players)
            {
                if (p.name == name)
                {
                    retVal = true;
                    break;
                }
            }

            return retVal;
        }

        public int? PlayerIndex(string name, List<Player> players)
        {
            int? retVal = null;
            foreach (Player p in players)
            {
                if (p.name == name)
                {
                    retVal = players.IndexOf(p);
                    break;
                }
            }

            return retVal;
        }

        public void SetPlayerActive(string name, List<Player> players)
        {
            foreach (Player p in players)
            {
                if (p.name == name)
                {
                    p.isActive = true;
                    break;
                }
            }
        }

        public void RemovePlayerFromList(string name, List<Player> players)
        {
            foreach (Player p in players)
            {
                if (p.name == name)
                {
                    players.Remove(p);
                    break;
                }
            }
        }

        public List<Player> GetPlayerListForGroup(string groupName)
        {
            List<Player> retVal;

            if (!_Players.ContainsKey(groupName))
            {
                retVal = new List<Player>();

                //create new list for the group
                _Players.TryAdd(groupName, retVal);
            }
            else
            {
                retVal = _Players[groupName];
            }

            return retVal;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="color"></param>
        //public void JoinGame(string userName, string color)
        //{
        //    //clear out game state
        //    //_playerList.Clear();
        //    //_playerNames.Clear();

        //    ////create some players
        //    //_playerNames.Add("Player 1");
        //    //var player1 = new Player
        //    //{
        //    //    id = 1,
        //    //    name = "Player 1",
        //    //    color = "green",
        //    //    score = 0,
        //    //    energy = 20,
        //    //    isAlive = true,
        //    //    isActive = false
        //    //};
        //    //_playerNames.Add("Player 2");
        //    //var player2 = new Player
        //    //{
        //    //    id = 2,
        //    //    name = "Player 2",
        //    //    color = "red",
        //    //    score = 0,
        //    //    energy = 20,
        //    //    isAlive = true,
        //    //    isActive = false
        //    //};
        //    //_playerNames.Add("Player 3");
        //    //var player3 = new Player
        //    //{
        //    //    id = 3,
        //    //    name = "Player 3",
        //    //    color = "blue",
        //    //    score = 0,
        //    //    energy = 20,
        //    //    isAlive = true,
        //    //    isActive = false
        //    //};
        //    //_playerList.Add(player1);
        //    //_playerList.Add(player2);
        //    //_playerList.Add(player3);

        //    //_playerList.Clear();
        //    var player = new Player
        //    {
        //        id = _playerList.Count()+1,
        //        name = userName,
        //        color = color,
        //        score = 0,
        //        energy = 20,
        //        isAlive = true,
        //        isActive = false
        //    };

        //    if (!_playerNames.Contains(userName) && _playerList.Count() <= _maxPlayers)
        //    {
        //        _playerList.Add(player);
        //        _playerNames.Add(userName);
        //        //send the new player data to the rest of the subscribers
        //        Clients.Others.addPlayer(player);
        //    }

        //    //send the current game state back to the caller
        //    Clients.Caller.updatePlayers(_playerList);
        //}
    }
}