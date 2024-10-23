import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Chip,
  TableBody,
  Stack,
} from "@mui/material";
import React from "react";
import {
  changeVisibility,
  deleteInventoryData,
  InventoryDataType,
  selectHiddenInventoryItems,
  selectInventoryData,
} from "../../features/inventoryData/inventoryDataSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  editCategory,
  editName,
  editPrice,
  editQuantity,
  editValue,
} from "../../features/editData/editDataSlice";

const InventoryTable: React.FC<{
  isAdmin: boolean;
  handleOpenDialog: (val: boolean) => void;
}> = ({ isAdmin, handleOpenDialog }) => {
  const inventoryData = useAppSelector(selectInventoryData);
  const hiddenItems = useAppSelector(selectHiddenInventoryItems);
  const dispatch = useAppDispatch();

  const onDeleteRow = (name: string) => {
    dispatch(deleteInventoryData(name));
  };

  const onEditRow = (item: InventoryDataType) => {
    dispatch(editName(item.name));
    dispatch(editCategory(item.category));
    dispatch(editPrice(item.price));
    dispatch(editQuantity(item.quantity));
    dispatch(editValue(item.value));
    handleOpenDialog(true);
  };

  const onChangeVisibility = (name: string) => {
    dispatch(changeVisibility(name));
  };
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: "#212124" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Chip
                label="Name"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
            <TableCell align="left">
              <Chip
                label="Category"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
            <TableCell align="left">
              <Chip
                label="Price"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
            <TableCell align="left">
              <Chip
                label="Quantity"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
            <TableCell align="left">
              <Chip
                label="Value"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
            <TableCell align="left">
              <Chip
                label="Action"
                sx={{ color: "#a3b555", backgroundColor: "#161718" }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventoryData &&
            inventoryData.map((row: InventoryDataType) => (
              <TableRow key={row.name}>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  {row.category}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  {row.price}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  {row.quantity}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  {row.value}
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: hiddenItems.includes(row.name) ? "gray" : "white",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EditIcon
                      color={
                        isAdmin && !hiddenItems.includes(row.name)
                          ? "success"
                          : "disabled"
                      }
                      onClick={
                        isAdmin && !hiddenItems.includes(row.name)
                          ? () => onEditRow(row)
                          : () => {}
                      }
                      sx={{ cursor: isAdmin ? "pointer" : "default" }}
                    />
                    {hiddenItems.includes(row.name) ? (
                      <VisibilityOffIcon
                        color={isAdmin ? "secondary" : "disabled"}
                        onClick={
                          isAdmin
                            ? () => onChangeVisibility(row.name)
                            : () => {}
                        }
                        sx={{ cursor: isAdmin ? "pointer" : "default" }}
                      />
                    ) : (
                      <VisibilityIcon
                        color={isAdmin ? "secondary" : "disabled"}
                        onClick={
                          isAdmin
                            ? () => onChangeVisibility(row.name)
                            : () => {}
                        }
                        sx={{ cursor: isAdmin ? "pointer" : "default" }}
                      />
                    )}
                    <DeleteIcon
                      color={isAdmin ? "error" : "disabled"}
                      onClick={isAdmin ? () => onDeleteRow(row.name) : () => {}}
                      sx={{ cursor: isAdmin ? "pointer" : "default" }}
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
