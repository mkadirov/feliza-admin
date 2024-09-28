import React, { useEffect, useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import LineChartOrder from "../../components/HomePage/LineChartOrder";
import { Box, Card, Grid, Typography } from "@mui/material";
import PieChartOrder from "../../components/HomePage/PieChartOrder";
import PieChartOrderStatus from "../../components/HomePage/PieChartOrderStatus";
import { getAllOrders } from "../../api/Orders";

function HomePage() {
  const [sumPaidOrders, setSumPaidOrders] = useState([]);
  const [isPaidList, setIsPaidList] = useState([]);
  const [listByStatusType, setListByStatusType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllOrders();

      if (res?.success) {
        console.log(res.data);

        const paidOrderList = res?.data?.filter((item) => item.paid);
        setSumPaidOrders(transformAndSumOrders(paidOrderList));
        setIsPaidList(getPaidStatusSummary(res.data));
        setListByStatusType(countByOrderStatusType(paidOrderList));
      }
    };

    fetchData();
  }, []);

  function transformAndSumOrders(orders) {
    const dateCostMap = orders.reduce((acc, order) => {
      const date = order.createdAt.split("T")[0]; // Make sure to use 'orderTime'
      if (!acc[date]) {
        acc[date] = { date: date, pv: 0 }; // Create a new entry
      }
      acc[date].pv += order.orderCost;
      return acc;
    }, {});

    // Convert the accumulator object to an array
    const resultArray = Object.values(dateCostMap);

    // Return only the last 30 elements of the array
    return resultArray.slice(-30);
  }

  function getPaidStatusSummary(arr) {
    return arr.reduce(
      (acc, item) => {
        if (item.paid) {
          acc[0].value += 1; // Increment count for 'To'langan'
        } else {
          acc[1].value += 1; // Increment count for 'To'lanmagan'
        }
        return acc;
      },
      [
        { name: "To'langan", value: 0 }, // First object for paid = true
        { name: "To'lanmagan", value: 0 }, // Second object for paid = false
      ]
    );
  }

  function countByOrderStatusType(arr) {
    const countMap = arr.reduce((acc, obj) => {
      // Count occurrences of each orderStatusType
      acc[obj.orderStatusType] = (acc[obj.orderStatusType] || 0) + 1;
      return acc;
    }, {});

    // Convert the countMap into an array of objects
    return Object.keys(countMap).map((key) => ({
      name: key,
      value: countMap[key],
    }));
  }

  function filterAndSortByOrderStatus(arr) {
    const allowedStatuses = ["NEW", "PACK", "SEND"];

    // Filter objects by allowed statuses
    const filtered = arr.filter((obj) => allowedStatuses.includes(obj.name));

    // Sort the filtered array based on the allowedStatuses array order
    return filtered.sort(
      (a, b) =>
        allowedStatuses.indexOf(a.name) - allowedStatuses.indexOf(b.name)
    );
  }

  return (
    <MainLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ marginTop: 3, height: "400px", width: "100%" }}>
            <Typography variant="h6" marginY={2} textAlign={"center"}>
              To'lov amalga oshirilgan va oshirilmagan buyurtmalar
            </Typography>

            <Box display={"flex"} gap={2} paddingX={2}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  sx={{ width: "40px", height: "10px", backgroundColor: "green" }}
                ></Box>
                <Typography>- to'langan</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  sx={{ width: "40px", height: "10px", backgroundColor: "red" }}
                ></Box>
                <Typography>- to'lanmagan</Typography>
              </Box>
            </Box>
            <PieChartOrder data={isPaidList} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ marginTop: 3, height: "400px", width: "100%" }}>
            <Typography variant="h6" marginY={2} textAlign={"center"}>
              Yetkazilmagan buyurtmalar
            </Typography>
            <Box display={"flex"} gap={2} paddingX={2}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  sx={{ width: "40px", height: "10px", backgroundColor: "red" }}
                ></Box>
                <Typography>- yangi</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  sx={{ width: "40px", height: "10px", backgroundColor: "orange" }}
                ></Box>
                <Typography>- tayyorlandi</Typography>
              </Box>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Box
                  sx={{ width: "40px", height: "10px", backgroundColor: "green" }}
                ></Box>
                <Typography>- jo'natildi</Typography>
              </Box>
            </Box>
            <PieChartOrderStatus
              data={filterAndSortByOrderStatus(listByStatusType)}
            />
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ marginTop: 3 }}>
            <Typography variant="h6" marginY={2} textAlign={"center"}>
              Oxirgi 30 kundagi buyurtmalar
            </Typography>
            <LineChartOrder list={sumPaidOrders} />
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default HomePage;
