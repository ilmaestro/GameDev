using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SpaceCommandR.Server.Classes
{
    public class Player
    {
        public int id { get; set; }
        public string name { get; set; }
        public string color { get; set; }
        public bool isAlive { get; set; }
        public bool isActive { get; set; }
        public int score { get; set; }
        public int energy { get; set; }
    }
}