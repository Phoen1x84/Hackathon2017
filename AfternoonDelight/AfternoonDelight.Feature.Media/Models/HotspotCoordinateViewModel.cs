using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotCoordinateViewModel
    {
        public string HostspotImageId { get; set; }
        [Range(0, 100)]
        public int XLocation { get; set; }
        [Range(0, 100)]
        public int YLocation { get; set; }
        public string DatabaseName { get; set; }
    }
}