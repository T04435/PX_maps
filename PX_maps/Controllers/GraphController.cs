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

		public List<Int32> getAVGDailySpeed(string day)
		{
			List<Int32> dailyAvgSpeed = new List<int>();
			SqlDataReader dr;

			using (SqlConnection dbconn = new SqlConnection(ConfigurationManager.ConnectionStrings["GPSDBContext"].ConnectionString))
			{
				//string CommandText = "SELECT (SUM(speed)/COUNT(speed)) FROM Data WHERE DATENAME(WEEKDAY,[isoDate]) = @weekday AND speed > 0 GROUP BY AND DATEPART(HOUR,[isoDate]) = @hour ";
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
							dailyAvgSpeed.Add(Int32.Parse(dr["hourlyAVGSpeed"].ToString()));
						}
					}
				}
				dbconn.Close();
			}

			return dailyAvgSpeed;
		}
	}
}
