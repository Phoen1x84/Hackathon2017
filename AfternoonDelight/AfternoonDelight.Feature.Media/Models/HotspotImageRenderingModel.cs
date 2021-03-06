﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sitecore.XA.Foundation.Multisite.LinkManagers;
using Sitecore.XA.Foundation.Mvc.Models;

namespace AfternoonDelight.Feature.Media.Models
{
    public class HotspotImageRenderingModel : RenderingModelBase
    {
        public string Id { get; set; }
        public MvcHtmlString Image { get; set; }
        public string ImageTitle { get; set; }
        public string ImageDescription { get; set; }
        public bool HasImageDescription { get; set; }
        public IEnumerable<HotspotModel> Hotspots { get; set; }
        public string DatabaseName { get; set; }
    }
}