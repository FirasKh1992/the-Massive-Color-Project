const styles={
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%",
    },
    goBack: {
        height: "50%",
        width: "20%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        opacity: 1,
        background: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255,255,255,0.3)",
            fontSize: "1rem",

            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none"

        },
        "@media (max-width: 1199.98px)": {
            width: "25%",
            height: "33.3333333%"
            
        },
        "@media (max-width: 991.98px)": {
            width: "50%",
            height: "20%"
        },
        "@media (max-width: 575.98px)": {
            width: "100%",
            height: "10%"
            
        }
    
    }

}

export default styles;