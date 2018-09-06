using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PeopleSearch.Models;
using RandomNameGeneratorLibrary;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PeopleSearch
{
    public class PersonService : Controller
    {
        private readonly PeopleSearchDBContext _context;

        public PersonService(PeopleSearchDBContext db)
        {
            _context = db;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        #region -- Generate Random Data --
        public void GeneratePeopleData()
        {
            PersonNameGenerator nameGenerator = new PersonNameGenerator();

            //Adding Male Names
            AddNamesToContext(nameGenerator.GenerateMultipleMaleFirstAndLastNames(200).ToList(), "Male");

            //Adding Female Names
            AddNamesToContext(nameGenerator.GenerateMultipleFemaleFirstAndLastNames(200).ToList(), "Female");
        }

        private void AddNamesToContext(List<string> names, string gender)
        {
            List<string> interestList = GetInterestList();

            foreach (string firstLast in names)
            {
                string[] name = firstLast.Split(' ');

                Random rnd = new Random();
                int randomAge = rnd.Next(30, 50);
                int randomIndex = 0;

                if (gender.Equals("Male"))
                {
                    randomIndex = rnd.Next(0, 11);
                }
                else
                {
                    randomIndex = rnd.Next(10, 21);
                    if (randomIndex.Equals(10)) randomIndex = 0;
                }

                string[] city = new string[] { "Irvine", "Tustin", "Santa Ana", "Fullerton" };
                string[] zip = new string[] { "92618", "92619", "92620", "92621" };
                string imageUrl = string.Format("./assets/img/picture{0}.jpg", randomIndex);
                if (randomIndex < 1 || randomIndex > 20) imageUrl = string.Empty;

                _context.Person.Add(new Person
                {
                    FirstName = name[0],
                    LastName = name[1],
                    Gender = gender,
                    Address = randomAge + " Main Street",
                    City = city[rnd.Next(city.Length)],
                    State = "CA",
                    Zip = zip[rnd.Next(zip.Length)],
                    Interests = GenerateInterest(interestList),
                    DateOfBirth = DateTime.Today.AddYears(randomAge * -1),
                    LastModified = DateTime.Now,
                    ImageUrl = imageUrl
                });
            }

            _context.SaveChanges();
        }

        public string GenerateInterest(List<string> interestList)
        {
            List<string> interests = new List<string>();

            Random rnd = new Random();
            var interestCount = rnd.Next(3, 6);
            for (var i = 0; i < 10; i++)
            {
                int index = rnd.Next(1, interestList.Count);
                int level = rnd.Next(1, 10);
                string randomInterest = interestList[index];

                if (!interests.Any(x => x.StartsWith(randomInterest)))
                    interests.Add(randomInterest + ":" + level);

                if (interests.Count >= interestCount)
                    break;
            }

            return string.Join(",", interests);
        }

        public List<string> GetInterestList()
        {
            List<string> interestList = new List<string>();
            interestList.Add("Tennis");
            interestList.Add("Soccer");
            interestList.Add("FootBall");
            interestList.Add("BaseBall");
            interestList.Add("BasketBall");
            interestList.Add("Cricket");
            interestList.Add("Running");
            interestList.Add("Swimming");
            interestList.Add("Jogging");
            interestList.Add("Walking");
            interestList.Add("Reading");
            interestList.Add("Writing");
            interestList.Add("Cooking");
            interestList.Add("Knitting");

            return interestList;
        }
        #endregion -- Generate Random Data --

    }
}
