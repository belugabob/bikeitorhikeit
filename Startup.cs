using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(bikeitorhikeit.Startup))]
namespace bikeitorhikeit
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
