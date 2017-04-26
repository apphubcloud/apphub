using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AppHub.Startup))]
namespace AppHub
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //ConfigureAuth(app);
        }
    }
}
