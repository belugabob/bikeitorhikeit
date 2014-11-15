using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(belugabrain.bikeitorhikeit.Startup))]
namespace belugabrain.bikeitorhikeit
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
