using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Sitecore.Pipelines;

namespace AfternoonDelight.Feature.Media.Pipelines.Initialize
{
    public class RegisterCustomRoute
    {
        public virtual void Process(PipelineArgs args)
        {
            RouteTable.Routes.MapRoute(
                "customapi",
                "customapi/{controller}/{action}/{id}",
                new { controller = "HotspotImage", action = "Test", id = UrlParameter.Optional }
            );
        }
    }
}