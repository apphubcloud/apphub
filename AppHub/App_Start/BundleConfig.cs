using System.Web;
using System.Web.Optimization;

namespace AppHub
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/resource/vendor_js").Include(
                      "~/Content/jquery/jquery.js",
                      "~/Content/angular/angular.js",
                      "~/Content/angular/angular-route.js"));

            bundles.Add(new StyleBundle("~/resource/vendor_css").Include(
                      "~/Content/slds/assets/styles/salesforce-lightning-design-system.css",
                      "~/Content/font-awesome/css/font-awesome.css"));

            bundles.Add(new ScriptBundle("~/resource/engine_js").Include(
                      "~/Engine/js/directive-factory.js",
                      "~/Engine/js/service-factory.js",
                      "~/Engine/js/engine.js"));

            bundles.Add(new StyleBundle("~/resource/engine_css").Include(
                      "~/Engine/css/engine.css"));

            bundles.Add(new ScriptBundle("~/resource/apphub_js").Include(
                      "~/AppHub/js/apphub.js",
                      "~/AppHub/js/dashboard.js"));
        }
    }
}
