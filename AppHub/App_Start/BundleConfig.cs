using System.Web;
using System.Web.Optimization;

namespace AppHub
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/Content/vendor_js").Include(
                      "~/Content/jquery/jquery.js"));

            bundles.Add(new StyleBundle("~/Content/vendor_css").Include(
                      "~/Content/slds/assets/styles/salesforce-lightning-design-system.css"));
        }
    }
}
