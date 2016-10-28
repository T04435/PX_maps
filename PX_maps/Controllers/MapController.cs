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

        /*
         * This function gets a json response with hour and day
         * it then builds a select query with the given values
         * It then returns a json response from the given database query 
         */

        public JsonResult getListLatLongs(string hour, string day)
        {
            SqlDataReader dr;
            List<LatLong> dbCoordinates = new List<LatLong>(); //list will be used to store the resulting query

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
            var result = Json(dbCoordinates, JsonRequestBehavior.AllowGet); //builds a json reponse
            result.MaxJsonLength = int.MaxValue; //this allows it to override the default size to a value around 10mbs
            return result;
        }
    }
}
