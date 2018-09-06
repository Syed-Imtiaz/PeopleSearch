using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using PeopleSearch.Models;
using System.Collections.Generic;

namespace PeopleSearch.Test
{
    [TestClass]
    public class PersonServiceTests
    {
        [TestMethod]
        public void Generate_People_Data()
        {
            var options = new DbContextOptionsBuilder<PeopleSearchDBContext>()
                .UseInMemoryDatabase(databaseName: "In_Memory_Database")
                .Options;

            // Run the test against one instance of the context
            using (var context = new PeopleSearchDBContext(options))
            {
                var service = new PersonService(context);
                service.GeneratePeopleData();
            }

            // Use a separate instance of the context to verify correct data was saved to database
            using (var context = new PeopleSearchDBContext(options))
            {
                Assert.AreEqual(400, context.Person.Count());
                Assert.AreEqual(200, context.Person.Where(p => p.Gender.Equals("Male")).Count());
                Assert.AreEqual(200, context.Person.Where(p => p.Gender.Equals("Female")).Count());
            }
        }

        [TestMethod]
        public void Generate_Interest()
        {
            var options = new DbContextOptionsBuilder<PeopleSearchDBContext>()
                .UseInMemoryDatabase(databaseName: "In_Memory_Database")
                .Options;

            // Run the test to see if interests are generated
            using (var context = new PeopleSearchDBContext(options))
            {
                var service = new PersonService(context);
                List<string> interestList = service.GetInterestList();
                string interests = service.GenerateInterest(interestList);

                Assert.AreNotEqual(0, interests.Length);
            }
        }
    }
}