import { CashbackData, processBookings } from "@/utils/cashbackUtils";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Booking {
  id: string;
  transactionDate: string;
  totalBookingAmount: string;
  bookingDetails: string;
  category: string;
}

export interface Stats {
  totalCashback: number;
  accountBalance: number;
  totalExpenses: number;
  bookingsCount: number;
}

export interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  method: string;
}

export interface StoreState {
  bookings: Booking[];
  stats: Stats;
  withdrawableCashback: number;
  withdrawalHistory: Withdrawal[];
  generateStats: () => void;
  setCashback: (cashback: number) => void;
  addBooking: (booking: Booking) => void;
  removeBooking: (id: string) => void;
  updateBooking: (updatedBooking: Booking) => void;
  filterByCategory: (category: string) => Booking[];
  processBookings: () => {
    cashbackData: CashbackData[];
    transformedData: { date: string; amount: number }[];
  };
  getCashback: () => number;
  getBalance: () => number;
  getBookingsCount: () => number;
  setWithdrawableCashback: (amount: number) => void;
  updateWithdrawableCashback: () => void;
  addWithdrawal: (withdrawal: Withdrawal) => void;
  initializeStore: () => void;
}

export const useBookingsStore = create<StoreState>()(
  persist(
    (set, get) => ({
      bookings: [
        {
          id: "12345",
          transactionDate: "2024-09-01",
          totalBookingAmount: "10,000.00",
          bookingDetails: "Hotel Stay",
          category: "Travel",
        },
        {
          id: "99001",
          transactionDate: "2024-01-05",
          totalBookingAmount: "9,000.00",
          bookingDetails: "Golf Club Membership",
          category: "Sports",
        },
        {
          id: "12332",
          transactionDate: "2023-12-20",
          totalBookingAmount: "6,000.00",
          bookingDetails: "Ski Resort",
          category: "Sports",
        },
      ],
      stats: {
        totalCashback: 0,
        accountBalance: 0,
        totalExpenses: 0,
        bookingsCount: 0,
      },
      withdrawableCashback: 0,
      withdrawalHistory: [],
      generateStats: () => {
        const bookings = get().bookings;
        const totalExpenses = bookings.reduce((sum, booking) => {
          // Ensure totalBookingAmount exists and is a number or a valid string
          const amount =
            typeof booking.totalBookingAmount === "string"
              ? parseFloat(booking.totalBookingAmount.replace(/,/g, ""))
              : booking.totalBookingAmount || 0; // Fallback to 0 if it's missing or invalid

          return sum + amount;
        }, 0);

        const totalCashback = totalExpenses * 0.015; // 1.5% cashback
        const bookingsCount = bookings.length;

        // Set account balance equal to totalCashback
        const accountBalance = totalCashback;

        set({
          stats: {
            totalCashback,
            accountBalance,
            totalExpenses,
            bookingsCount,
          },
        });
      },
      setCashback: (cashback: number) => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalCashback: cashback,
          },
        });
      },
      addBooking: (booking: Booking) => {
        set((state) => ({
          bookings: [...state.bookings, booking],
        }));
        get().generateStats();
      },
      removeBooking: (id: string) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }));
        get().generateStats();
      },
      updateBooking: (updatedBooking: Booking) => {
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === updatedBooking.id ? updatedBooking : booking
          ),
        }));
        get().generateStats();
      },

      filterByCategory: (category: string) => {
        return get().bookings.filter(
          (booking) => booking.category === category
        );
      },
      processBookings: () => {
        return processBookings(get().bookings);
      },
      getCashback: () => get().stats.totalCashback,
      getBalance: () => get().stats.accountBalance,
      getBookingsCount: () => get().stats.bookingsCount,
      setWithdrawableCashback: (amount: number) => {
        set({ withdrawableCashback: amount });
      },
      updateWithdrawableCashback: () => {
        const { stats } = get();
        set({
          withdrawableCashback: stats.totalCashback,
        });
      },
      addWithdrawal: (withdrawal: Withdrawal) => {
        set((state) => ({
          withdrawalHistory: [...state.withdrawalHistory, withdrawal],
        }));
      },

      initializeStore: () => {
        set({
          bookings: [
            {
              id: "12345",
              transactionDate: "2024-09-01",
              totalBookingAmount: "10000.00",
              bookingDetails: "Hotel Stay",
              category: "Travel",
            },
            {
              id: "99001",
              transactionDate: "2024-01-05",
              totalBookingAmount: "9000.00",
              bookingDetails: "Golf Club Membership",
              category: "Sports",
            },
            {
              id: "12332",
              transactionDate: "2023-12-20",
              totalBookingAmount: "6000.00",
              bookingDetails: "Ski Resort",
              category: "Sports",
            },
          ],
          stats: {
            totalCashback: 0,
            accountBalance: 0,
            totalExpenses: 0,
            bookingsCount: 0,
          },
          withdrawableCashback: 0,
          withdrawalHistory: [],
        });
        get().generateStats();
      },

      // ...
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
