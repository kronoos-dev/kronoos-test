import Logo from "./icons/Logo";
import Paper from "@mui/material/Paper";

export default function TopBar() {
    return (
        <Paper sx={{paddingLeft: 7, maxHeight: 60}} elevation={3}>
            <Logo/>
        </Paper>
    )
}

