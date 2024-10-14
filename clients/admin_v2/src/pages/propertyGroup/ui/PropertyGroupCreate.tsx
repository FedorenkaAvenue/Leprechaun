import { FormControl, FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { PropertyGroupDTO } from "@pages/propertyGroup/api/dto";
import LoadingButton from '@mui/lab/LoadingButton';

import { useCreatePropertyGroup } from "../api/hooks";
import { useNavigate } from "react-router-dom";
import { PROPERTY_GROUP_PATH } from "@shared/constants/routes";

const PropertyGroupCreate = () => {
    const nav = useNavigate();
    const { register, handleSubmit } = useForm<PropertyGroupDTO>();
    const { mutate, isPending } = useCreatePropertyGroup(() => {
        nav(PROPERTY_GROUP_PATH);
    });
    const sendForm: SubmitHandler<PropertyGroupDTO> = data => {
        mutate(data);
    };

    return (
        <form onSubmit={handleSubmit(sendForm)} className="flex gap-4 flex-col items-baseline">
            <FormControl>
                <FormGroup>
                    <FormControlLabel control={
                        <Switch {...register('is_primary')} />
                    }
                        label="primary" />
                </FormGroup>
            </FormControl>
            <div>
                <FormLabel component="legend">Title</FormLabel>
                <div className="flex gap-1">
                    <TextField {...register('title.en')} required id="outlined-basic" label="eng" variant="outlined" />
                    <TextField {...register('title.ru')} required id="outlined-basic" label="ru" variant="outlined" />
                    <TextField {...register('title.ua')} required id="outlined-basic" label="ua" variant="outlined" />
                </div>
            </div>
            <TextField {...register('alt_name')} required id="outlined-basic" label="alt name" variant="outlined" />
            <TextField {...register('comment')} id="outlined-basic" label="comment" variant="outlined" />
            <div className="w-full flex justify-center">
                <LoadingButton
                    type='submit'
                    loading={isPending}
                    loadingPosition="center"
                    variant="contained"
                >
                    Save
                </LoadingButton>
            </div>
        </form >
    );
};

export default PropertyGroupCreate;
