using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AfternoonDelight.Feature.Media.Repositories;
using Sitecore.XA.Foundation.Mvc.Controllers;

namespace AfternoonDelight.Feature.Media.Controllers
{
    public class HotspotImageController : StandardController
    {
        protected readonly IHotspotImageRepository HotspotImageRepository;

        public HotspotImageController(IHotspotImageRepository hotspotImageRepository)
        {
            HotspotImageRepository = hotspotImageRepository;
        }

        protected override object GetModel()
        {
            return HotspotImageRepository.GetModel();
        }
    }
}