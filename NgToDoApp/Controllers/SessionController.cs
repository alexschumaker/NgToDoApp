using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace NgToDoApp.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        [HttpGet("[action]")]
        public List<Task> SessionTasks()
        {
            Console.WriteLine("INIT");
            if (TaskList.Count == 0)
            {
                TaskList = defaultToDo;
            }

            return TaskList;
        }

        [HttpPost("SessionPost")]
        public Task SessionPost([FromBody] Task task)
        {
            Console.WriteLine("POSTING SOME DATA");
            TaskList.Add(task);
            
            return task;
        }

        [HttpDelete("SessionDelete/{index}")]
        public int SessionDelete(int index)
        {
            Console.WriteLine("DELETEING " + index);
            TaskList.RemoveAt(index);
           
            return index;
        }

        [HttpPut("SessionPut/{index}")]
        public Task SessionPut([FromBody] Task task, int index)
        {
            Console.WriteLine("EDITING " + index);
            TaskList[index] = task;
            return task;
        }

        private static List<Task> TaskList = new List<Task> { };

        private List<Task> defaultToDo = new List<Task> {
                new Task {
                description = "Do Taxes",
                completed = true,
                dateCreated = "03/08/2019"
            },
                new Task {
                description = "Get Eggs to dye",
                completed = false,
                dateCreated = "03/12/2019"
            },
                new Task {
                description = "Send Memes to Artem",
                completed = false,
                dateCreated = "03/01/2019"
            }};

        public class Task
        {
            public string description { get; set; }
            public bool completed { get; set; }
            public string dateCreated { get; set; }
        }
    }
}