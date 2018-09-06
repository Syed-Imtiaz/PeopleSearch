using System;
using System.Collections.Generic;

namespace PeopleSearch.Models
{
    public partial class Person
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Interests { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? LastModified { get; set; }

        public int Age
        {
            get
            {
                if (DateOfBirth.HasValue)
                    return DateTime.Today.Year - DateOfBirth.Value.Year;
                else
                    return 0;
            }
        }
    }
}
