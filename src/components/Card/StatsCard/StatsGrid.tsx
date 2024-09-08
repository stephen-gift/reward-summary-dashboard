import { StatGroup } from "@chakra-ui/react";
import StatsCard from "./StatsCard";
import { BsCash } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useBookingsStore } from "../../../../store";
import { formatAmountWithCommas } from "@/utils/formatAmount";

export default function StatsGrid() {
  const { stats } = useBookingsStore();

  return (
    <StatGroup gap={5}>
      <StatsCard
        title={"Total Cashback"}
        stat={`$${formatAmountWithCommas(stats.totalCashback)}`}
        icon={<BsCash size={"3em"} />}
      />
      <StatsCard
        title={"Expenses"}
        stat={`$${formatAmountWithCommas(stats.totalExpenses)}`}
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
