import React, {ChangeEvent, useState} from "react";
import {
    Alert,
    CircularProgress,
    Grid,
    Paper,
    Snackbar,
    Stack,
} from "@mui/material";
import {useFileValidationMutation} from "../hook/react-query/FileValidationMutation";
import DataTable from "./components/Table/Table";
import {IDataContent} from "../@types/dataContent.types";
import ErrorIcon from '@mui/icons-material/Error';
import "./inputStyles.css";

import {
    BackButton,
    Container,
    ErrorLabel,
    FormLabel,
    TitleComponent,
    UploadButton
} from "./components/FormComponents/FormComponents"
import {KeyboardBackspace} from "@mui/icons-material";

export default function Home() {
    const {uploadAndValidate, isLoading} = useFileValidationMutation();
    const [validatedData, setValidatedData] = useState<IDataContent[]>([])
    const [fileHasError, setFileHasError] = useState<boolean>(false)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [messageError, setMessageError] = useState('')
    const [csvFile, setCsvFile] = useState<Blob>();
    const formData = new FormData();

    if (csvFile) {
        formData.append('file', csvFile);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCsvFile(e.target.files[0]);
            if (e.target.files[0]) {
                console.log(e.target?.files[0]);
            }
        }
    };

    const cleanData = () => {
        setValidatedData([]);
        setFileHasError(false);
    };

    const handleUploadClick = () => {
        try {
            setValidatedData([]);
            setFileHasError(false);
            const fetchData = async () => {
                const {data, hasError} = await uploadAndValidate(formData)
                setValidatedData(data)
                setFileHasError(hasError);
            };
            fetchData().catch(e => {
                setMessageError(e.response.data.message)
                setOpenSnackbar(true)
            });

        } catch (err) {
            console.log('err', err)
            setMessageError('Erro inesperado')
            setOpenSnackbar(true)
        }
    };

    return (
        <Paper elevation={0} sx={{flex: 1, alignItems: 'center'}}>
            {!validatedData || validatedData.length === 0 ?
                <Container>
                    <TitleComponent> Validação de dados</TitleComponent>
                    <FormLabel> Selecione o arquivo .csv para validação</FormLabel>
                    <Stack sx={{flexDirection: 'row', alignItems: 'center', marginTop: 2}}>
                        <input type="file" onChange={handleFileChange} title="" accept={".csv"}/>
                    </Stack>
                    {csvFile &&
                        <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
                    }
                    {isLoading &&
                        <Stack sx={{alignItems: 'center', width: '100%', marginTop: 10}}>
                            <CircularProgress/>
                        </Stack>
                    }
                </Container>
                :
                <Container>
                    <Stack alignSelf={'self-start'}>
                        <BackButton onClick={cleanData} startIcon={<KeyboardBackspace/>}>Voltar</BackButton>
                    </Stack>
                    {fileHasError &&
                        <Stack sx={{flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 5   }}>
                            <ErrorIcon color={"error"}/>
                            <ErrorLabel>Foram encontrados alguns erros durante a validação</ErrorLabel>
                        </Stack>
                    }
                    <Grid container sx={{alignItems: 'center', justifyContent: 'center'}}>
                        {validatedData && validatedData.length > 0 &&
                            //@ts-ignore
                            <DataTable rows={validatedData} loading={isLoading}/>
                        }
                    </Grid>
                </Container>
            }
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}
                      anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                      }}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="error">
                    {messageError}
                </Alert>
            </Snackbar>
        </Paper>

    )

}