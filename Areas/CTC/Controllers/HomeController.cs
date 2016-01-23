using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace belugabrain.bikeitorhikeit.Areas.CTC.Controllers
{
    public class HomeController : Controller
    {
        // GET: CTC/Home
        public ActionResult Index()
        {
            return RedirectToAction("Index", "Home", new { area = "CTN" });
        }
    }
}