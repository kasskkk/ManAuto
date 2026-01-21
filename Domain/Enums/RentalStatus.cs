namespace Domain.Enums;

public enum RentalStatus
{
    /// <summary>
    /// Car is booked and deposit is paid.
    /// </summary>
    Reserved = 0,

    /// <summary>
    /// Booking was cancelled (term becomes available for others).
    /// </summary>
    Cancelled = 1,

    /// <summary>
    /// Full payment received, but the rental period hasn't started yet.
    /// </summary>
    FullyPaid = 2,

    /// <summary>
    /// Rental is in progress. User is currently driving the car.
    /// </summary>
    Active = 3,

    /// <summary>
    /// Car has been returned and the rental is closed.
    /// </summary>
    Returned = 4
}
