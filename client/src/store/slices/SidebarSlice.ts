import { createSlice } from "@reduxjs/toolkit";


interface sidebarState{
    isSidebarShown:boolean;
}


const initialState:sidebarState = {
    isSidebarShown:false,
}

const sidebarSlice = createSlice({

    name:"sidebar",

    initialState,

    reducers:{

        displaySidebar(state){

            state.isSidebarShown = true;

        },

        hideSidebar(state){

            state.isSidebarShown = false;

        },

        toggleSidebar(state){

            state.isSidebarShown = !state.isSidebarShown;

        }


    }


})


export const {  displaySidebar,hideSidebar,toggleSidebar  } = sidebarSlice.actions;

export default sidebarSlice;