import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  editCategory,
  editPrice,
  editQuantity,
  editValue,
  selectEditDataCategory,
  selectEditDataName,
  selectEditDataPrice,
  selectEditDataQuantity,
  selectEditDataValue,
} from "../../features/editData/editDataSlice";
import {
  InventoryDataType,
  updateInventoryData,
} from "../../features/inventoryData/inventoryDataSlice";

interface EditDataDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

const EditDataDialog: React.FC<EditDataDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectEditDataName);
  const category = useAppSelector(selectEditDataCategory);
  const quantity = useAppSelector(selectEditDataQuantity);
  const price = useAppSelector(selectEditDataPrice);
  const value = useAppSelector(selectEditDataValue);

  const onCategoryChange = (val: string) => {
    dispatch(editCategory(val));
  };

  const onPriceChange = (val: string) => {
    dispatch(editPrice(val));
  };

  const onQuantityChange = (val: string) => {
    dispatch(editQuantity(val));
  };

  const onValueChange = (val: string) => {
    dispatch(editValue(val));
  };

  const saveDataHandler = () => {
    let payload: InventoryDataType = {
      name,
      category,
      price,
      quantity,
      value,
    };
    dispatch(updateInventoryData(payload));
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        style: { backgroundColor: "#292B27" },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle id="alert-dialog-title">Edit Product</DialogTitle>
        <div
          style={{
            padding: "6px",
            border: "solid rgb(81,82,80)",
            borderWidth: "0.1px",
            borderRadius: "10px",
            backgroundColor: "#272826",
            marginRight: "0.8rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CloseIcon onClick={handleClose} sx={{ color: "#a3b555" }} />
        </div>
      </Stack>
      <Typography mx={3} variant="body1">
        {name}
      </Typography>
      <DialogContent>
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Stack spacing={1}>
            <Typography variant="caption">Category</Typography>
            <TextField
              id="filled-hidden-label-small"
              variant="outlined"
              value={category}
              size="small"
              hiddenLabel
              sx={{ backgroundColor: "#3F413D" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onCategoryChange(event.target.value);
              }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="caption">Price</Typography>
            <TextField
              id="filled-hidden-label-small"
              variant="outlined"
              value={price}
              size="small"
              hiddenLabel
              sx={{ backgroundColor: "#3F413D" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onPriceChange(event.target.value);
              }}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={4}
          mt={3}
        >
          <Stack spacing={1}>
            <Typography variant="caption">Quantity</Typography>
            <TextField
              id="filled-hidden-label-small"
              variant="outlined"
              value={quantity}
              size="small"
              hiddenLabel
              sx={{ backgroundColor: "#3F413D" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onQuantityChange(event.target.value);
              }}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="caption">Value</Typography>
            <TextField
              id="filled-hidden-label-small"
              variant="outlined"
              value={value}
              size="small"
              hiddenLabel
              sx={{ backgroundColor: "#3F413D" }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onValueChange(event.target.value);
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="warning">
          Cancel
        </Button>
        <Button onClick={saveDataHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDataDialog;
