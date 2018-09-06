using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PeopleSearch.Models;
using RandomNameGeneratorLibrary;

namespace PeopleSearch.Controllers
{
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private readonly PeopleSearchDBContext _context;

        public PersonController(PeopleSearchDBContext context)
        {
            _context = context;
            if (_context.Person.ToList().Count == 0)
            {
                PersonService service = new PersonService(context);
                service.GeneratePeopleData();
            }
        }

        [HttpGet("[action]")]
        public ActionResult<IEnumerable<Person>> SearchPeople(string personName)
        {
            Thread.Sleep(1500);

            var persons = _context.Person
                .Where(p => string.IsNullOrEmpty(personName) || p.FirstName.Contains(personName) || p.LastName.Contains(personName))
                .ToList();

            if (persons == null)
            {
                return NotFound();
            }

            return persons;
        }

        [HttpGet("{id:int}", Name = "GetPersonById")]
        public ActionResult<Person> GetPersonById(int id)
        {
            Person person = _context.Person.Find(id);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        [HttpGet("{name}", Name = "GetPersonsByName")]
        public ActionResult<IEnumerable<Person>> GetPersonsByName(string name)
        {
            var persons = _context.Person
                .Where(p => p.FirstName.Contains(name) || p.LastName.Contains(name))
                .ToList();

            if (persons == null)
            {
                return NotFound();
            }

            return persons;
        }
    }
}
