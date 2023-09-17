import {useMutation} from 'react-query';
import {FileService} from "../../services/FileService";
import {AxiosCustomError} from "../../@types/axiosCustomErros";
import {useSnackbar} from "notistack";

export function useFileValidationMutation() {
    const {enqueueSnackbar} = useSnackbar();
    const {mutateAsync: uploadAndValidate, isLoading: isLoading} = useMutation(
        FileService.getInstance().uploadAndValidate,
        {
            onError(err: AxiosCustomError) {
                    enqueueSnackbar(err.message, {
                        variant: 'error',
                    });

            },
            onSuccess(data) {
                return data;
            }}
    );

    return {
        uploadAndValidate,
        isLoading,
    };
}
