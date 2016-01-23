using System.Web.Mvc;

namespace belugabrain.bikeitorhikeit.Areas.CTN
{
    public class CTNAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CTN";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CTN_default",
                "CTN/{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                new [] {"belugabrain.bikeitorhikeit.Areas.CTN.Controllers"}
            );
        }
    }
}