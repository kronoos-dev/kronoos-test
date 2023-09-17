import { styled } from '@mui/system';
import {Stack, Typography, Button} from "@mui/material";
import {theme} from "../../../theme";

export const TitleComponent = styled(Typography)({
    color: theme.palette.primary.main,
    fontSize: 36,
    fontWeight: 'bold',
    paddingTop: 70,
    paddingBottom: 30,
});

export const FormLabel = styled(Typography)({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: 18,

});

export const UploadButton = styled(Button)({
    marginTop: 30,
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    textTransform: 'none',
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        borderColor: "#FFFF",
    },
    borderRadius: 8,
    width: 250,
});

export const BackButton = styled(Button)({
    marginTop: 15,
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    textTransform: 'none',
    "&:hover": {
        backgroundColor: '#fff',
        color: theme.palette.primary.main,
    },
    borderRadius: 8,
    width: 200,
});

export const ErrorLabel = styled(Typography)({
    color: theme.palette.error.main,
    fontSize: 20,
    paddingLeft: 10,
});

export const Container = styled(Stack)({
    flex: 1,
    marginTop: 10,
    paddingX: 5,
    alignItems: 'center',
    justifyContent: 'center'
});