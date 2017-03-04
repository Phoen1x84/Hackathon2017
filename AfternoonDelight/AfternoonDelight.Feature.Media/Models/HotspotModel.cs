using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using Sitecore.Data.Items;
using Sitecore.Xml.XPath;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotModel
    {
        public int LocationX { get; set; }
        public int LocationY { get; set; }
        public int Title { get; set; }
        public int Icon { get; set; }
        public int Description { get; set; }

        public HotspotModel(Item item)
        {
            if (item == null)
            {
                return;
            }

            int locationX;
            if (int.TryParse(item[Templates.Hotspot.Fields.LocationX], out locationX))
            {
                
            }
        }
    }
}