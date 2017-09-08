using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AppHub.Controllers
{
    public class EngineController : Controller
    {
        // GET: Engine
        public String Test(String testArgs)
        {
            return testArgs;
        }
    }
}