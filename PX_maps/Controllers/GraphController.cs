using PX_maps.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PX_maps.Controllers
{
	public class GraphController : Controller
	{
		// GET: Graph
		public ActionResult Index()
		{
			return View();
		}

		public JsonResult getAVGDailySpeed(string day)
		{
			List<GraphModels> dailyAvgSpeed = new List<GraphModels>();
			SqlDataReader dr;

			using (SqlConnection dbconn = new SqlConnection(ConfigurationManager.ConnectionStrings["GPSDBContext"].ConnectionString))
			{
				string CommandText = "SELECT AVG(speed) AS hourlyAVGSpeed FROM Data WHERE DATENAME(WEEKDAY,[isoDate]) = @weekday AND speed > 0 GROUP BY DATEPART(HOUR,[isoDate]) ";

				using (SqlCommand cmd = new SqlCommand(CommandText, dbconn))
				{
					cmd.Parameters.AddWithValue("@weekday", day);
					dbconn.Open();
					dr = cmd.ExecuteReader();
					if (dr.HasRows)
					{
						while (dr.Read())
						{
							dailyAvgSpeed.Add(new GraphModels
							{
								avgSpeed = Decimal.Parse(dr["hourlyAVGSpeed"].ToString())
							});
						}
					}
				}
				dbconn.Close();
			}
			JsonResult retVal = Json(dailyAvgSpeed, JsonRequestBehavior.AllowGet);
			retVal.MaxJsonLength = 485638;
			return retVal;
		}
	}
}
