using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotCoordinateViewModel
    {
        public string HostspotImageId { get; set; }
        public int XLocation { get; set; }
        public int YLocation { get; set; }
        public string DatabaseName { get; set; }
    }
}