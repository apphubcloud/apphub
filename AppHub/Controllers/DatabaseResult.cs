using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AppHub.Controllers
{
    public class DatabaseResult
    {
        public Boolean success;
        public String messege;
        public Object result;
        public Object data;
        public DatabaseResult() 
        {
            this.success = true;
        }
        public DatabaseResult(String messege)
        {
            this.success = true;
            this.messege = messege;
        }
        public DatabaseResult(Object data)
        {
            this.success = true;
            this.data = data;
        }
        public DatabaseResult(String messege,Object data)
        {
            this.success = true;
            this.messege = messege;
            this.data = data;
        }
        public DatabaseResult(Boolean success, String messege)
        {
            this.success = success;
            this.messege = messege;
        }
        public DatabaseResult(Boolean success, String messege, Object data)
        {
            this.success = success;
            this.messege = messege;
            this.data = data;
        }
        public DatabaseResult(List<DatabaseResult> results)
        {
            this.success = true;
            foreach (DatabaseResult result in results) 
            {
                if (!result.success) 
                {
                    this.success = result.success;
                    this.messege = result.messege;
                    this.result = results;
                }
            }
        }
        public DatabaseResult(Exception ex)
        {
            this.success = false;
            this.messege = ex.Message;
        }
    }
}