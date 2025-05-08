using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    //localhost:xxx/api/employees
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDBContext dbContext;

        public EmployeeController(ApplicationDBContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpGet]
        public  IActionResult GetAllEmployees()
        {

            return Ok(dbContext.Employees.ToList());
        }


        //retrive
        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetEmployeesById(Guid id)
        {
            var employee = dbContext.Employees.Find(id);

            if(employee is null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        //create
        [HttpPost]
        public IActionResult AddEmployee(AddEmployeeDto addEmployeeDto)
        {
            var employeeEntity = new Employee()
            {
                Name = addEmployeeDto.Name,
                Email = addEmployeeDto.Email,
                Phone = addEmployeeDto.Phone,
                Salary = addEmployeeDto.Salary
            };

            dbContext.Employees.Add(employeeEntity);
            dbContext.SaveChanges();

            return Ok(employeeEntity);
        }

        //update
        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateEmployee(Guid id,UpdateEmployeeDto updateEmployeeDto)
        {
            var employee = dbContext.Employees.Find(id);

            if (employee is null)
            {
                return NotFound();
            }
            employee.Name = updateEmployeeDto.Name; 
            employee.Email = updateEmployeeDto.Email;   
            employee.Phone = updateEmployeeDto.Phone;       
            employee.Salary = updateEmployeeDto.Salary;

            dbContext.SaveChanges();

            return Ok(employee);
        }

        //delete
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteEmployee(Guid id)
        {
            var employee = dbContext.Employees.Find(id);

            if (employee is null)
            {
                return NotFound();
            }

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();

            return Ok(employee);
        }

    }
}
