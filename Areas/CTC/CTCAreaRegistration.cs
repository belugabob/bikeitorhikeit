using System.Web.Mvc;

namespace belugabrain.bikeitorhikeit.Areas.CTC
{
    public class CTCAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CTC";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "CTC_default",
                "CTC/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional },
                new [] {"belugabrain.bikeitorhikeit.Areas.CTC.Controllers"}
            );
        }
    }
}