using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PX_maps.Models
{
    public class Database
    {
        public string deviceId { get; set; }
        public int latitude { get; set; }
        public int longitude { get; set; }
        public int speed { get; set; }
        public int reliability { get; set; }
        public int satellite { get; set; }
        public string type { get; set; }
        public int locked { get; set; }
        public string date { get; set; }
    }
    public class GPSDBContext : DbContext
    {
        public DbSet<Database> GPSData { get; set; }
    }
}