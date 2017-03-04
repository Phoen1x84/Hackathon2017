using System.Collections.Generic;
using System.Linq;
using Sitecore.Data.Fields;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Multisite.LinkManagers;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using AfternoonDelight.Feature.Media.Models;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace AfternoonDelight.Feature.Media.Repositories
{
    public class HotspotImageRepository : ModelRepository, IHotspotImageRepository, IModelRepository, IAbstractRepository<IRenderingModelBase>
    {
        public override IRenderingModelBase GetModel()
        {
            var hotspotImageRenderingModel = new HotspotImageRenderingModel();

            FillBaseProperties(hotspotImageRenderingModel);
            hotspotImageRenderingModel.HasImageDescription = HasImageDescription();

            List<HotspotModel> hotspots = GetHotspots();

            hotspotImageRenderingModel.Hotspots = hotspots;
            hotspotImageRenderingModel.HasHotspots = hotspots.Any();

            return hotspotImageRenderingModel;
        }

        protected virtual List<HotspotModel> GetHotspots()
        {
            if (Rendering.DataSourceItem != null && Rendering.DataSourceItem.Children.Any(c => c.TemplateID.Equals(Templates.Hotspot.ID)))
            {
                
            }

            return null;
        }

        protected virtual bool HasImageDescription()
        {
            return Rendering.DataSourceItem?.Fields[Templates.HotspotImage.Fields.ImageDescription] != null
                && !string.IsNullOrEmpty(Rendering.DataSourceItem[Templates.HotspotImage.Fields.ImageDescription]);
        }
    }
}