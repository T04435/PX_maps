using PX_maps.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;
using System.Web.Script.Serialization;

namespace PX_maps.Controllers
{
	public class MapController : Controller
	{
		// GET: GoogleMap
		public ActionResult Index()
		{
			return View();
		}

        public JsonResult getListLatLongs(string hour, string day)
        {
            SqlDataReader dr;
            List<LatLong> dbCoordinates = new List<LatLong>();

            using (SqlConnection dbconn = new SqlConnection(ConfigurationManager.ConnectionStrings["GPSDBContext"].ConnectionString))
            {
                string CommandText = "SELECT [deviceId],latitude,longitude,[speed] FROM Data WHERE DATENAME(WEEKDAY,[isoDate]) = @weekday AND DATEPART(HOUR,[isoDate]) = @hour AND speed > 0 ORDER BY [deviceId], [isoDate]";

				using (SqlCommand cmd = new SqlCommand(CommandText, dbconn))
				{
					cmd.Parameters.AddWithValue("@weekday", day);
					cmd.Parameters.AddWithValue("@hour", hour);
					dbconn.Open();
					dr = cmd.ExecuteReader();
					if (dr.HasRows)
					{
						while (dr.Read())
						{
							dbCoordinates.Add(new LatLong
							{
								deviceID = dr["deviceId"].ToString(),
								speed = Decimal.Parse(dr["speed"].ToString()),
								latitude = Decimal.Parse(dr["latitude"].ToString()),
								longitude = Decimal.Parse(dr["longitude"].ToString())
							});
						}
					}
				}
				dbconn.Close();
			}
			JsonResult result = Json(dbCoordinates, JsonRequestBehavior.AllowGet);
			result.MaxJsonLength = 8675309;
			return result;
		}
	}
                using (SqlCommand cmd = new SqlCommand(CommandText, dbconn))
                {
                    cmd.Parameters.AddWithValue("@weekday", day);
                    cmd.Parameters.AddWithValue("@hour", hour);
                    dbconn.Open();
                    dr = cmd.ExecuteReader();
                    if (dr.HasRows)
                    {
                        while (dr.Read())
                        {
                            dbCoordinates.Add(new LatLong
                            {
                                deviceID = dr["deviceId"].ToString(),
                                speed = Decimal.Parse(dr["speed"].ToString()),
                                latitude = Decimal.Parse(dr["latitude"].ToString()),
                                longitude = Decimal.Parse(dr["longitude"].ToString())
                            });
                        }
                    }
                }
                dbconn.Close();
            }
            JsonResult result = Json(dbCoordinates, JsonRequestBehavior.AllowGet);
            result.MaxJsonLength = 8675309;
            return result;
        }
    }
}
