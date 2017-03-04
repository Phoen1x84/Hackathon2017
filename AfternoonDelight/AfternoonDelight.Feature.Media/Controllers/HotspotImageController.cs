using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using AfternoonDelight.Feature.Media.Models;
using AfternoonDelight.Feature.Media.Repositories;
using Sitecore.Data;
using Sitecore.Diagnostics;
using Sitecore.Exceptions;
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

        public virtual JsonResult SaveHotspotCoordintes(HotspotCoordinateViewModel hotspotCoordinateViewModel)
        {
            if (hotspotCoordinateViewModel == null)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ArgumentNullException(nameof(hotspotCoordinateViewModel)));
            }

            if (string.IsNullOrEmpty(hotspotCoordinateViewModel.HotspotImageId))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ArgumentNullException(nameof(hotspotCoordinateViewModel.HotspotImageId)));
            }

            if (string.IsNullOrEmpty(hotspotCoordinateViewModel.DatabaseName))
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new ArgumentNullException(nameof(hotspotCoordinateViewModel.DatabaseName)));
            }

            ID hotspotImageId;
            if (!ID.TryParse(hotspotCoordinateViewModel.HotspotImageId, out hotspotImageId))
            {
                Response.StatusCode = (int) HttpStatusCode.BadRequest;
                return Json(new InvalidCastException($"{nameof(hotspotCoordinateViewModel.HotspotImageId)} should be a valid Sitecore ID"));
            }

            var hotspotModel = new HotspotModel()
            {
                LocationX = hotspotCoordinateViewModel.XLocation,
                LocationY = hotspotCoordinateViewModel.YLocation,
            };

            try
            {
                HotspotImageRepository.CreateHotspot(hotspotImageId, hotspotModel, hotspotCoordinateViewModel.DatabaseName);

                Response.StatusCode = (int)HttpStatusCode.OK;
                return Json("Hotspot created");
            }
            catch (DatabaseNullException e)
            {
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(e);
            }
            catch (ItemNotFoundException e)
            {
                Response.StatusCode = (int)HttpStatusCode.NotFound;
                return Json(e);
            }
            catch (Exception e)
            {
                Log.Error(e.Message, e, this);
                Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                return Json(e);
            }
        }

        public JsonResult Test()
        {
            return Json("Test");
        }
    }
}