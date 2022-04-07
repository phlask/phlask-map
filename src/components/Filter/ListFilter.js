import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Modal,
  Slide,
  Typography,
  ListItemButton
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as FoodIcon } from "../icons/FoodIconV2.svg";
import { ReactComponent as ForagingIcon } from "../icons/ForagingIconV2.svg";
import { ReactComponent as ResourcesPin } from "../icons/ResourcesPin.svg";
import { ReactComponent as ToiletIcon } from "../icons/ToiletIconV2.svg";
import { ReactComponent as WaterIcon } from "../icons/WaterIconV2.svg";

const ListFilter = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="large"
        sx={{
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent"
          }
        }}
      >
        <Box>
          <ResourcesPin />
          <Typography size="small" color={"black"}>
            Resources
          </Typography>
        </Box>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Slide
          direction="up"
          in={open}
          mountOnEnter
          unmountOnExit
          timeout={250}
        >
          <List sx={{ maxWidth: 185 }}>
            <ListItemButton sx={{ alignItems: "end" }}>
              <ListItemIcon>
                <WaterIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="button1"
                  textAlign={"center"}
                  color={"black"}
                  mx={1.5}
                  bgcolor={"white"}
                  p={0.5}
                  borderRadius={1}
                  px={1}
                >
                  Water
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ alignItems: "end" }}>
              <ListItemIcon>
                <FoodIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="button1"
                  textAlign={"center"}
                  mx={1.5}
                  bgcolor={"white"}
                  p={0.5}
                  borderRadius={1}
                  px={1}
                >
                  Food
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ alignItems: "end" }}>
              <ListItemIcon>
                <ForagingIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="button1"
                  textAlign={"center"}
                  mx={1.5}
                  bgcolor={"white"}
                  p={0.5}
                  borderRadius={1}
                  px={1}
                >
                  Foraging
                </Typography>
              </ListItemText>
            </ListItemButton>
            <ListItemButton sx={{ alignItems: "end" }}>
              <ListItemIcon>
                <ToiletIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="button1"
                  textAlign={"center"}
                  mx={1.5}
                  bgcolor={"white"}
                  p={0.5}
                  borderRadius={1}
                  px={1}
                >
                  Bathroom
                </Typography>
              </ListItemText>
            </ListItemButton>
          </List>
        </Slide>
      </Modal>
    </>
  );
};

export default ListFilter;
