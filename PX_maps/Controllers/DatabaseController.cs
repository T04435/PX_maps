using Microsoft.VisualBasic.FileIO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;

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
                    string[] colFields = new string[9];
										
                    colFields[0] = "deviceId";
                    colFields[1] = "latitude";
                    colFields[2] = "longitude";
                    colFields[3] = "speed";
                    colFields[4] = "reliability";
                    colFields[5] = "satellite";
                    colFields[6] = "type";
                    colFields[7] = "lock";
                    colFields[8] = "isoDate";
                    Regex csvrgx = new Regex(@"^\w{3,9}\,\d{1,3}\.\d{1,6}\,\d{1,3}\.\d{1,6}\,\d{1,3}\.\d{1,2}\,\d\.\d\,\d\,\d\,\d\,[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\s[A-Z]{3}\s\d{4}$");
                    foreach (string column in colFields)
                    {
                        DataColumn datecolumn = new DataColumn(column);
                        csvData.Columns.Add(datecolumn);
                    }

                    while (!csvReader.EndOfData)
                    {
                        string[] fieldData = csvReader.ReadFields();
                        string fieldDataString = string.Join(",", fieldData);
                        if (csvrgx.IsMatch(fieldDataString))
                        {
                            for (int i = 0; i < fieldData.Length; i++)
                            {
                                Regex datergx = new Regex(@"^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\s[A-Z]{3}\s\d{4}$");

                                if (datergx.IsMatch(fieldData[i]))
                                {
                                    Regex timezone = new Regex(@"\sICT");
                                    string pattern = "ddd MMM dd HH:mm:ss yyyy";
                                    DateTime parsedDate;
                                    fieldData[i] = timezone.Replace(fieldData[i], "");
                                    DateTime.TryParseExact(fieldData[i], pattern, null, DateTimeStyles.AdjustToUniversal, out parsedDate);
                                    fieldData[i] = parsedDate.ToString();
                                }

                            }
                            csvData.Rows.Add(fieldData);
                        }
                        else
                        {

                        }
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
                    s.DestinationTableName = "Data";
                    s.WriteToServer(csvFileData);
                }
                dbConnection.Close();
            }
        }
        [HttpPost]
        public ActionResult Index(IList<HttpPostedFileBase> files)
        {
            int count = files.Count;
            foreach (var file in files)
            {
                if (file.ContentLength > 0)
                {
                    var fileName = Path.GetFileName(file.FileName);
                    ListFilesLeft(fileName, count, files.Count);
                    var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                    if (Path.GetFileName(path).Equals(fileName))
                    {
                        System.IO.File.Delete(path);
                    }
                    file.SaveAs(path);

                    GetDataTabletFromCSVFile(path);
                    System.IO.File.Delete(path);
                }
                count--;
            }
            TempData["File"] = "<p>Done!</p>";
            return RedirectToAction("Index");

        }
        public ActionResult ListFilesLeft(string file, int count, int total)
        {
            System.Diagnostics.Debug.WriteLine("<p>Current file is: " + file + " Number of files left: " + count + " / " + total + "</p>");
            TempData["File"] = "<p>Current file is: " + file + " Number of files left: " + count + " / " + total + "</p>";
            return RedirectToAction("Running");
        }
    }
}
