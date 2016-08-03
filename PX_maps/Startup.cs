using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PX_maps.Startup))]
namespace PX_maps
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
