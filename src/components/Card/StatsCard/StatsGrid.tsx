import { StatGroup } from "@chakra-ui/react";
import StatsCard from "./StatsCard";
import { BsCash } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useBookingsStore } from "../../../../store";

export default function StatsGrid() {
  const { stats } = useBookingsStore();

  return (
    <StatGroup gap={5}>
      <StatsCard
        title={"Total Cashback"}
        stat={`$${stats.totalCashback.toFixed(2)}`}
        icon={<BsCash size={"3em"} />}
      />
      <StatsCard
        title={"Expenses"}
        stat={`$${stats.totalExpenses.toFixed(2)}`}
        icon={<FiDollarSign size={"3em"} />}
      />
      <StatsCard
        title={"Bookings"}
        stat={stats.bookingsCount.toString()}
        icon={<AiOutlineShoppingCart size={"3em"} />}
      />
    </StatGroup>
  );
}
