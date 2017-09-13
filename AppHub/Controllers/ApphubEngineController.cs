using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace AppHub.Controllers
{
    public class ApphubEngineController : Controller
    {
        // GET: Engine
        public String getAllObjects()
        {
            DatabaseResult response = Database.query("Select Id,Name,Label From apphub_Objects");
            return JsonConvert.SerializeObject(response);
        }
    }
}