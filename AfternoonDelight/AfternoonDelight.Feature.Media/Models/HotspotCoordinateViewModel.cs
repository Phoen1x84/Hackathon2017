﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotCoordinateViewModel
    {
        public string Title { get; set; }
        public string HotspotImageId { get; set; }
        [Range(0, 100)]
        public double XLocation { get; set; }
        [Range(0, 100)]
        public double YLocation { get; set; }
        public string DatabaseName { get; set; }
    }
}