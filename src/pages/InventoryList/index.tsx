import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatsCard from "../../components/StatsCard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import {
  fetchData,
  selectTotalProducts,
  selectTotalStoreValue,
  selectOutOfStock,
  selectCategories,
} from "../../features/inventoryData/inventoryDataSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUserType } from "../../features/userToggle/userToggleSlice";
import InventoryTable from "../../components/InventoryTable";
import EditDataDialog from "../../components/EditDataDialog";

const InventoryList: React.FC = () => {
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(selectUserType);
  const totalProducts = useAppSelector(selectTotalProducts);
  const totalStoreValue = useAppSelector(selectTotalStoreValue);
  const outOfStock = useAppSelector(selectOutOfStock);
  const categories = useAppSelector(selectCategories);
  const handleCloseDialog = () => {
    setOpenEditDialog(false);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <Box my={3}>
      <Typography variant="h4">Inventory stats</Typography>
      <Stack direction="row" spacing={2} width="100%" my={3}>
        <StatsCard
          text={"Total products"}
          value={totalProducts}
          icon={ShoppingCartIcon}
        />
        <StatsCard
          text={"Total store value"}
          value={totalStoreValue}
          icon={CurrencyExchangeIcon}
        />
        <StatsCard
          text={"Out of stocks"}
          value={outOfStock}
          icon={RemoveShoppingCartIcon}
        />
        <StatsCard
          text={"No of category"}
          value={categories}
          icon={CategoryIcon}
        />
      </Stack>
      <InventoryTable
        isAdmin={isAdmin}
        handleOpenDialog={(val: boolean) => setOpenEditDialog(val)}
      />
      <EditDataDialog isOpen={openEditDialog} handleClose={handleCloseDialog} />
    </Box>
  );
};

export default InventoryList;
