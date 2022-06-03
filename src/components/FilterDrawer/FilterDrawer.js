import { Box, SwipeableDrawer, Typography, Button, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";


const FilterButton = styled(Button)(({ theme }) => ({
    color: "#2D3748",
    border: "1.5px solid #525F75",
    textTransform: "none",
}));


export default function FilterDrawer() {
    const dispatch = useDispatch();
    const isFilterShown = useSelector(state => state.isFilterShown);
    const toggleFilterModal = () => {
        dispatch({
            type: "TOGGLE_FILTER_MODAL",
            isShown: !isFilterShown
        });
    };
    return (
        <SwipeableDrawer
          anchor="bottom"
          variant="temporary"
          open={isFilterShown}
          onOpen={toggleFilterModal}
          onClose={toggleFilterModal}
          sx={{
              "& .MuiDrawer-paper": {
                  height: "60%"
              }
          }}
        >
          <Box
            sx={{
                height: "20%",
                backgroundColor: "#525F75",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
          >
            <Typography variant="h6" color="white">
              Water Filter
            </Typography>
          </Box>
          <div>
            <div className="d-flex flex-column" style={{margin: "0 1em"}}>

              <div style={{margin: "1em auto"}}>
                <Typography variant="h7" color="#525F75">
                  Features
                </Typography>
                <div className="d-flex flex-wrap mt-2" style={{gap: "0.5em", color: "#525F75"}}>
                  <FilterButton >Vessel Needed</FilterButton>
                  <FilterButton variant="outlined">ADA Accessible</FilterButton>
                  <FilterButton variant="outlined">Filtered</FilterButton>
                  <FilterButton variant="outlined">Open Now</FilterButton>
                  <FilterButton variant="outlined">Self-Service</FilterButton>
                </div>
              </div>

              <div>
                <Typography variant="h7" color="#525F75">
                  Features
                </Typography>
                <div className="d-flex mt-2" style={{gap: "0.5em"}}>
                  <FilterButton variant="outlined">Drinking Fountain</FilterButton>
                  <FilterButton variant="outlined">Bottle Filter</FilterButton>
                </div>
              </div>

              <div style={{margin: "1em auto"}}>
                <Typography variant="h7" color="#525F75">
                  Features
                </Typography>
                <div className="d-flex mt-2">
                  <FilterButton variant="outlined">Public</FilterButton>
                  <FilterButton variant="outlined">Private</FilterButton>
                  <FilterButton variant="outlined">Shared</FilterButton>
                  <FilterButton variant="outlined">Restricted</FilterButton>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-3">
                <Button style={{textTransform: "none", color: "#2D3748"}}>Clear All</Button>
                <Button style={{textTransform: "none"}}variant="outlined">Apply</Button>
              </div>

            </div>
            <div>
            </div>
            <div>
            </div>
          </div>
        </SwipeableDrawer>
    );
}
