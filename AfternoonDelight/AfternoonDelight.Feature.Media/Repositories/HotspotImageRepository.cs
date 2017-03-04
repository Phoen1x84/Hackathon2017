using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Sitecore.Data.Fields;
using Sitecore.XA.Foundation.Multisite;
using Sitecore.XA.Foundation.Multisite.LinkManagers;
using Sitecore.XA.Foundation.Mvc.Repositories.Base;
using AfternoonDelight.Feature.Media.Models;
using Sitecore.Data;
using Sitecore.Data.Items;
using Sitecore.Diagnostics;
using Sitecore.Exceptions;
using Sitecore.Security.Accounts;
using Sitecore.XA.Foundation.SitecoreExtensions.Extensions;

namespace AfternoonDelight.Feature.Media.Repositories
{
    public class HotspotImageRepository : ModelRepository, IHotspotImageRepository, IModelRepository, IAbstractRepository<IRenderingModelBase>
    {
        public override IRenderingModelBase GetModel()
        {
            var hotspotImageRenderingModel = new HotspotImageRenderingModel();

            FillBaseProperties(hotspotImageRenderingModel);

            if (Rendering.DataSourceItem != null)
            {
                hotspotImageRenderingModel.Id = Rendering.DataSourceItem.ID.ToString();
                hotspotImageRenderingModel.Image = new MvcHtmlString(Sitecore.Web.UI.WebControls.FieldRenderer.Render(Rendering.DataSourceItem, nameof(Templates.HotspotImage.Fields.Image)));
                hotspotImageRenderingModel.ImageTitle = Rendering.DataSourceItem[Templates.HotspotImage.Fields.ImageTitle];
                hotspotImageRenderingModel.ImageDescription = Rendering.DataSourceItem[Templates.HotspotImage.Fields.ImageDescription];
                hotspotImageRenderingModel.HasImageDescription = HasImageDescription();

                hotspotImageRenderingModel.Hotspots = GetHotspots();

                hotspotImageRenderingModel.DatabaseName = Sitecore.Context.Database.Name;
            }

            return hotspotImageRenderingModel;
        }

        public void CreateHotspot(ID hotspotImageId, HotspotModel hotspotModel, string databaseName)
        {
            Assert.ArgumentNotNull(hotspotImageId, nameof(hotspotImageId));
            Assert.ArgumentNotNull(hotspotModel, nameof(hotspotModel));
            Assert.ArgumentNotNull(databaseName, nameof(databaseName));

            Database database = Sitecore.Data.Database.GetDatabase(databaseName);
            if (database == null)
            {
                throw new DatabaseNullException();
            }

            Item hotspotImageItem = database.GetItem(hotspotImageId);
            if (hotspotImageItem == null)
            {
                throw new ItemNotFoundException(hotspotImageId.ToString());
            }

            TemplateID templateId = new TemplateID(Templates.Hotspot.ID);

            using (new Sitecore.SecurityModel.SecurityDisabler())
            {
                string itemName = ItemUtil.ProposeValidItemName(hotspotModel.Title);

                Item hotspotItem = hotspotImageItem.Add(itemName, templateId);

                try
                {
                    hotspotItem.Editing.BeginEdit();
                    hotspotItem.Fields[Templates.Hotspot.Fields.Title].Value = hotspotModel.Title;
                    hotspotItem.Fields[Templates.Hotspot.Fields.LocationX].Value = hotspotModel.LocationX.ToString();
                    hotspotItem.Fields[Templates.Hotspot.Fields.LocationY].Value = hotspotModel.LocationY.ToString();
                    hotspotItem.Editing.EndEdit();
                }
                catch (Exception e)
                {
                    hotspotItem.Editing.CancelEdit();
                    Log.Error(e.Message, e, this);
                    throw;
                }
            }
        }

        protected virtual IEnumerable<HotspotModel> GetHotspots()
        {
            if (Rendering.DataSourceItem != null && Rendering.DataSourceItem.Children.Any(c => c.TemplateID.Equals(Templates.Hotspot.ID)))
            {
                return Rendering.DataSourceItem.Children
                        .Where(c => c.TemplateID.Equals(Templates.Hotspot.ID))
                        .Select(c => new HotspotModel(c));
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