using AfternoonDelight.Feature.Media.Models;
using Sitecore.Data;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;

namespace AfternoonDelight.Feature.Media.Repositories
{
    public interface IHotspotImageRepository : IModelRepository, IAbstractRepository<IRenderingModelBase>
    {
        void CreateHotspot(ID hotspotImageId, HotspotModel hotspotModel, string DatabaseName);
    }
}