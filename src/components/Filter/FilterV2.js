import {
  Box,
  Link,
  IconButton,
  Modal,
  Stack,
  Slide,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as FoodIcon } from "../icons/FoodIconV2.svg";
import { ReactComponent as ForagingIcon } from "../icons/ForagingIconV2.svg";
import { ReactComponent as PhlaskFilterIcon } from "../icons/PhlaskFilterButton.svg";
import { ReactComponent as ToiletIcon } from "../icons/ToiletIconV2.svg";
import { ReactComponent as WaterIcon } from "../icons/WaterIconV2.svg";

const FilterV2 = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <PhlaskFilterIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Slide
          direction="up"
          in={open}
          mountOnEnter
          unmountOnExit
          timeout={250}
        >
          <Stack spacing={2} m={2} maxWidth={175}>
            <Stack direction="row">
              <WaterIcon />
              <Box display={"flex"} alignItems={"end"}>
                <Typography
                  color={"black"}
                  mx={1.5}
                  bgcolor={"white"}
                  p={0.5}
                  borderRadius={1}
                >
                  Water
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <FoodIcon />
              <Box display={"flex"} alignItems={"end"}>
                <Typography mx={1.5} bgcolor={"white"} p={0.5} borderRadius={1}>
                  Food
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <ForagingIcon />
              <Box display={"flex"} alignItems={"end"}>
                <Typography mx={1.5} bgcolor={"white"} p={0.5} borderRadius={1}>
                  Foraging
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <ToiletIcon />
              <Box display={"flex"} alignItems={"end"}>
                <Typography mx={1.5} bgcolor={"white"} p={0.5} borderRadius={1}>
                  Toilets
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Slide>
      </Modal>
    </>
  );
};

export default FilterV2;
