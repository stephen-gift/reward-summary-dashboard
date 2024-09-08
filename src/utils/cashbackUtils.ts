export interface Booking {
  transactionDate: string;
  totalBookingAmount: string;
}

export interface CashbackData {
  month: string;
  cashback: number;
}

/**
 * Process bookings to get cashback data and transformed data.
 * @param bookings Array of bookings
 * @returns An object containing arrays of cashback data by month and transformed booking data
 */
export const processBookings = (bookings: Booking[]) => {
  const monthlyCashback: Record<string, number> = {};
  const transformedData = bookings.map((booking: Booking) => {
    const date = new Date(booking.transactionDate);
    const month = date.toLocaleString("default", { month: "short" });
    const formattedDate = `${month}`;

    // Ensure totalBookingAmount is a string
    const amountString = String(booking.totalBookingAmount).replace(
      /[^0-9.-]+/g,
      ""
    );
    const amount = parseFloat(amountString);
    const cashback = amount * 0.015; // 1.5% cashback

    if (monthlyCashback[formattedDate]) {
      monthlyCashback[formattedDate] += cashback;
    } else {
      monthlyCashback[formattedDate] = cashback;
    }

    return {
      date: formattedDate,
      amount,
    };
  });

  const cashbackData = Object.keys(monthlyCashback).map((month) => ({
    month,
    cashback: monthlyCashback[month],
  }));

  return {
    cashbackData,
    transformedData,
  };
};
