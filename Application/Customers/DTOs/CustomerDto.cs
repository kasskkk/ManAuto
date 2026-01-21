using System;

namespace Application.Customers.DTOs;

public class CustomerDto
{
    public required string Id { get; set; }
    public required string Email { get; set; }
    public required string PhoneNumber { get; set; }
}
