using System;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Web;
using System.Web.Mvc;
using Microsoft.VisualBasic.FileIO;
using System.Configuration;
using System.Text.RegularExpressions;
using System.Globalization;

namespace PX_maps.Controllers
{
    public class DatabaseController : Controller
    {
        // GET: Database
        public ActionResult Index()
        {
            // update database 
            return View();
        }

        private void GetDataTabletFromCSVFile(string csv_file_path)
        {
            DataTable csvData = new DataTable();
            try
            {
                using (TextFieldParser csvReader = new TextFieldParser(csv_file_path))
                {
                    csvReader.SetDelimiters(new string[] { "," });
                    csvReader.HasFieldsEnclosedInQuotes = false;
                    string[] colFields = csvReader.ReadFields();
                    Regex datergx = new Regex(@"^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\s[A-Z]{3}\s\d{4}$");

                    if (!(colFields[0].Equals("deviceId~2")))
                    {
                        colFields[0] = "deviceId~2";
                        colFields[1] = "latitude";
                        colFields[2] = "longitude";
                        colFields[3] = "speed~1";
                        colFields[4] = "reliability~4";
                        colFields[5] = "satellite";
                        colFields[6] = "type~4";
                        colFields[7] = "lock~4";
                        colFields[8] = "isoDate~9";
                    }
                    foreach (string column in colFields)
                    {
                        DataColumn datecolumn = new DataColumn(column);
                        csvData.Columns.Add(datecolumn);
                    }
                    while (!csvReader.EndOfData)
                    {
                        string[] fieldData = csvReader.ReadFields();
                        for (int i = 0; i < fieldData.Length; i++)
                        {
                            if (datergx.IsMatch(fieldData[i]))
                            {        
                                Regex timezone = new Regex(@"\sICT");
                                string pattern = "ddd MMM dd hh:mm:ss yyyy";
                                DateTime parsedDate;
                                fieldData[i] = timezone.Replace(fieldData[i], "");
                                DateTime.TryParseExact(fieldData[i],pattern,null, DateTimeStyles.None,out parsedDate);
                                fieldData[i] = parsedDate.ToString();
                            }
                        }
                        csvData.Rows.Add(fieldData);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            InsertDataIntoSQLServerUsingSQLBulkCopy(csvData);
        }
        static void InsertDataIntoSQLServerUsingSQLBulkCopy(DataTable csvFileData)
        {
            using (SqlConnection dbConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["GPSDBContext"].ConnectionString))
            {
                string dbConnectionString = ConfigurationManager.ConnectionStrings["GPSDBContext"].ConnectionString;
                dbConnection.Open();
                using (SqlBulkCopy s = new SqlBulkCopy(dbConnectionString, SqlBulkCopyOptions.KeepIdentity))
                {
                    s.DestinationTableName = "Test";
                    s.WriteToServer(csvFileData);
                }
                dbConnection.Close();
            }
        }
        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file)
        {

            if (file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                file.SaveAs(path);

                GetDataTabletFromCSVFile(path);
            }

            return RedirectToAction("Index");

        }
    }
}
