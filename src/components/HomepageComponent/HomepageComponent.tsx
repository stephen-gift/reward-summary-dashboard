"use client ";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import EarningsOverview from "./EarningsOverview";
import CashbackHistory from "./CashbackHistory";
import CashoutOptions from "./CashoutOptions";
import ManageBookings from "./ManageBookings";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WithdrawalHistory from "./WithdrawalHistory";

const tabNames = [
  "earnings-overview",
  "cashback-history",
  "cashout-options",
  "manage-bookings",
];

const HomepageComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabName = urlParams.get("tab") ?? "";
    if (tabName) {
      const index = tabNames.indexOf(tabName);
      if (index !== -1) {
        setTabIndex(index);
      }
    } else {
      setTabIndex(0);
      const newUrl = `${pathname}?tab=${tabNames[0]}`;
      router.replace(newUrl, { scroll: false });
    }
  }, []);

  const handleTabChange = (index: number) => {
    const tabName = tabNames[index];
    const newUrl = `${pathname}?tab=${tabName}`;
    router.push(newUrl, { scroll: false });
    setTabIndex(index);
  };
  return (
    <Box>
      <Tabs
        isFitted
        variant="soft-rounded"
        colorScheme="pink"
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab>Earnings Overview</Tab>
          <Tab>Cashback History</Tab>
          <Tab>Cashout Options</Tab>
          <Tab>Manage Bookings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <EarningsOverview />
          </TabPanel>

          <TabPanel>
            <CashbackHistory />
          </TabPanel>

          <TabPanel>
            <CashoutOptions />
            <WithdrawalHistory />
          </TabPanel>

          <TabPanel>
            <ManageBookings />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default HomepageComponent;
