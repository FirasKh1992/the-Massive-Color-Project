const styles={
    root: {
        backgroundColor:"blue",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    },
    container:{
        width:"50%",
        display:"flex",
        alignItems:"flex-start",
        flexDirection:"column",
        flexWrap:"wrap",
        "@media (max-width: 1600px)": {
            width: "80%",
        },
        "@media (max-width: 575.98px)": {
            width: "70%",
            
        },


    },
    nav:{
        display:"flex",
        width:"100%",
        justifyContent:"space-between",
        color:"white",
        alignItems:"center",
        "& a":{
            color:"white"
        }

    },
    palettes:{
        boxSizing:"border-box",
        width:"100%",
        display:"grid",
        gridTemplateColumns:"repeat(3,30%)",
        gridGap:"2.5rem",
        "@media (max-width: 767.98px)": {
            gridTemplateColumns:"repeat(2,50%)",
           
            
        },
        "@media (max-width: 575.98px)": {
            gridTemplateColumns:"repeat(1,100%)",
            gridGap:"1rem"
           
            
        },

    }
}

export default styles;

