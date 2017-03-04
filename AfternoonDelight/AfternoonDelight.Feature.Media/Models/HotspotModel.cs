using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Resources.Media;
using Sitecore.XA.Foundation.Mvc.Models;
using Sitecore.Xml.XPath;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotModel
    {
        public int LocationX { get; set; }
        public int LocationY { get; set; }
        public string Title { get; set; }
        public MvcHtmlString Icon { get; set; }
        public string Description { get; set; }

        public HotspotModel()
        {
            
        }

        public HotspotModel(Item item)
        {
            if (item == null)
            {
                return;
            }

            int locationX;
            if (int.TryParse(item[Templates.Hotspot.Fields.LocationX], out locationX))
            {
                LocationX = locationX;
            }

            int locationY;
            if (int.TryParse(item[Templates.Hotspot.Fields.LocationY], out locationY))
            {
                LocationY = locationY;
            }

            Title = item[Templates.Hotspot.Fields.Title];
            Icon = new MvcHtmlString(Sitecore.Web.UI.WebControls.FieldRenderer.Render(item, nameof(Templates.Hotspot.Fields.Icon)));
            Description = item[Templates.Hotspot.Fields.Description];
        }
    }
}