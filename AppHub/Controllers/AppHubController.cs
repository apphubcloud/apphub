using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppHub.Controllers
{
    public class AppHubController : Controller
    {
        // GET: AppHub
        public ActionResult Index()
        {
            return View();
        }
    }
}