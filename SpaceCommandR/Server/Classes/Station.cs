using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SpaceCommandR.Server.Classes
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double x { get; set; }
        public double y { get; set; }
        public int PlayerId { get; set; }
    }
}
