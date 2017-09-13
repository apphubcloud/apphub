using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace AppHub.Controllers
{
    public class Database
    {
        public static SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["cs"].ConnectionString);
        public static SqlDataAdapter da;
        public static SqlCommand cmd;
        public static DataSet ds;
        public static DataRow dr;
        public static DatabaseResult query(String query) 
        {
            try
            {
                cmd = new SqlCommand(query, con);
                da = new SqlDataAdapter(cmd);
                ds = new DataSet();
                da.Fill(ds);
                return new DatabaseResult(ds.Tables[0]);
            }
            catch (Exception ex) 
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult insert(Dictionary<String,Object> record)
        {
            try
            {
                return null;
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult update(Dictionary<String, Object> record)
        {
            try
            {
                return null;
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult delete(String id)
        {
            try
            {
                return null;
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult insert(List<Dictionary<String, Object>> records)
        {
            try
            {
                List<DatabaseResult> results = new List<DatabaseResult>();
                foreach (Dictionary<String, Object> record in records) 
                {
                    results.Add(Database.insert(record));
                }
                return new DatabaseResult(results);
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult update(List<Dictionary<String, Object>> records)
        {
            try
            {
                List<DatabaseResult> results = new List<DatabaseResult>();
                foreach (Dictionary<String, Object> record in records)
                {
                    results.Add(Database.update(record));
                }
                return new DatabaseResult(results);
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult delete(List<String> ids)
        {
            try
            {
                List<DatabaseResult> results = new List<DatabaseResult>();
                foreach (String id in ids)
                {
                    results.Add(Database.delete(id));
                }
                return new DatabaseResult(results);
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult save(Dictionary<String, Object> record)
        {
            try
            {
                if (record.ContainsKey("Id") || record.ContainsKey("id"))
                {
                    return Database.update(record);
                }
                else
                {
                    return Database.insert(record);
                }
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
        public static DatabaseResult save(List<Dictionary<String, Object>> records)
        {
            try
            {
                List<DatabaseResult> results = new List<DatabaseResult>();
                foreach (Dictionary<String, Object> record in records)
                {
                    results.Add(Database.save(record));
                }
                return new DatabaseResult(results);
            }
            catch (Exception ex)
            {
                return new DatabaseResult(ex);
            }
        }
    }
}