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
    // Extract tab name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabName = urlParams.get("tab") ?? "";
    if (tabName) {
      // Set tab index based on URL parameter
      const index = tabNames.indexOf(tabName);
      if (index !== -1) {
        setTabIndex(index);
      }
    } else {
      // Default to the first tab if no tab parameter is found
      setTabIndex(0);
      const newUrl = `${pathname}?tab=${tabNames[0]}`;
      router.replace(newUrl, { scroll: false }); // Use replace to avoid adding a new entry to the history stack
    }
  }, []);

  const handleTabChange = (index: number) => {
    const tabName = tabNames[index];
    const newUrl = `${pathname}?tab=${tabName}`;
    router.push(newUrl, { scroll: false }); // Prevent scroll restoration
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
