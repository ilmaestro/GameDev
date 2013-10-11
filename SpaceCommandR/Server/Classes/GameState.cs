using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceCommandR.Server.Classes
{
    public class GameState
    {
        public List<Player> Players = new List<Player>();
        public List<Station> Stations = new List<Station>();
    }
}