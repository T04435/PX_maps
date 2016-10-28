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
            // Show the default view of the Database
            return View();
        }

        /*
         * This function takes a path of a file tries to add them
         * to the database, it uses regular expressions
         * this website will help with testing http://regexstorm.net/tester
         */
        private void GetDataTabletFromCSVFile(string csv_file_path)
        {
            DataTable csvData = new DataTable(); //Csv reader is used to store the file currently being read
            try
            {
                using (TextFieldParser csvReader = new TextFieldParser(csv_file_path))
                {
                    
                    csvReader.SetDelimiters(new string[] { "," });
                    csvReader.HasFieldsEnclosedInQuotes = false;
                    string[] colFields = new string[9];

					//The coloumns need to be the same as the database table and have the same number of fields	
                    			
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
                    foreach (string column in colFields) // change each coloumn of the csv/txt to Datatable
                    {
                        DataColumn datecolumn = new DataColumn(column);
                        csvData.Columns.Add(datecolumn);
                    }

                    while (!csvReader.EndOfData)
                    {
                        string[] fieldData = csvReader.ReadFields();
                        string fieldDataString = string.Join(",", fieldData);
                        /* 
                         * This regex will check the current row and if it doesnt match the regex it will move onto the next row
                         *  The regex will accept this "51C18087,10.88865,106.81669,0.0,0.0,0,1,0,Wed Sep 10 00:15:00 ICT 2014"
                         */
                        if (csvrgx.IsMatch(fieldDataString))
                        {
                            for (int i = 0; i < fieldData.Length; i++)
                            {
                                Regex datergx = new Regex(@"^[A-Z][a-z]{2}\s[A-Z][a-z]{2}\s\d{2}\s\d{2}\:\d{2}\:\d{2}\s[A-Z]{3}\s\d{4}$");
                                /*  This regex checks the date to make sure it isnt malformed as it will crash the database if the date is incorrect
                                 *  This if statement will convert the date from ISO to a date SQL will accept.
                                 */
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
                    }
                }
            }
            catch (Exception ex) //Print any errors
            {
                System.Diagnostics.Debug.WriteLine(ex);
            }
            InsertDataIntoSQLServerUsingSQLBulkCopy(csvData);


        }
        /*  
         *  This function takes a Datatable and inserts into the database
         *  The database connects with the GPSDBContext Connection string
         */ 
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

        /*  
         *  This function is fired once the user hits the submit button
         *  It takes an array of files, saves the first file runs the file through 
         *  GetDataTabletFromCSVFile function and once done deletes and moves onto next file
         */

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
            /*  
             *  This function is meant to show how many files are left but does not work
             */ 
            System.Diagnostics.Debug.WriteLine("<p>Current file is: " + file + " Number of files left: " + count + " / " + total + "</p>");
            TempData["File"] = "<p>Current file is: " + file + " Number of files left: " + count + " / " + total + "</p>";
            return RedirectToAction("Running");
        }
    }
}
